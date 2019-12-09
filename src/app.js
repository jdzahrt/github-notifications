const getOpenPRs = require('./graph');
const sendEmail = require('./mail');

Date.prototype.subtractDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() - days);
    return date;
};

const compileOpenPRMessage = async (dayThreshold, login, repoName) => {
    let messageList = '';

    const prObject = await getOpenPRs(login, repoName);

    const prs = prObject.data.user.repository.pullRequests.nodes;

    const filteredResults = prs.filter((pr) => {
        const d1 = new Date(pr.createdAt);
        const newDate = new Date();

        return d1 < newDate.subtractDays(dayThreshold);
    });

    filteredResults.forEach((pr) => {
        const message = `PR: ${pr.headRefName} - ${pr.permalink} was created on: ${pr.createdAt} and is still OPEN. Please review.`;

        messageList += `<p>${message}</p>`;
    });

    await sendEmail('jdzahrt@gmail.com', repoName, messageList);
};

module.exports = {compileOpenPRMessage};

//compileOpenPRMessage(1, 'jdzahrt',"weather-website");
