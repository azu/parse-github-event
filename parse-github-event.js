"use strict";
var GITHUB_DOMAIN = "https://github.com";
function parse(event) {
    var repo = event.repo.name;
    switch (event.type) {
        case 'CreateEvent':
            switch (event.payload.ref_type) {
                case 'repository':
                    return {
                        text: "created repo %%repository%%",
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
                case 'tag':
                    return {
                        text: "created tag %%ref_type%% at %%repository%%",
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/releases/tag/" + event.payload.ref
                    };
                case 'branch':
                    return {
                        text: "created branch %%ref_type%% at %%repository%%",
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/tree/" + event.payload.ref
                    };
            }
            break;
        case 'MemberEvent':
            switch (event.payload.action) {
                case 'added':
                    return {
                        text: "added %%member%% to %%repository%%",
                        data: {
                            member: event.payload.member,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + event.payload.member.login
                    };
            }
            break;
        case 'PushEvent':
            var branch = event.payload.ref.substr(event.payload.ref.lastIndexOf('/') + 1);
            return {
                text: "pushed to %%branch%% at %%repository%%",
                data: {
                    branch: branch,
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo + "/compare/" + event.payload.before + "..." + event.payload.head
            };
            break;
        case 'ForkApplyEvent':
            return {
                text: "merged to %%repository%%",
                data: {
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo.name + "/compare/" + event.payload.before + "..." + event.payload.head
            };
            break;
        case 'ForkEvent':
            return {
                text: "forked %%repository%%",
                data: {
                    repository: repo
                },
                html_url: event.payload.forkee.html_url
            };
            break;
        case 'WatchEvent':
            switch (event.payload.action) {
                case 'started':
                    return {
                        text: "started watching %%repository%%",
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
                    break;
                case 'stopped':
                    return {
                        text: "stopped watching %%repository%%",
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
            }
            break;
        case 'FollowEvent':
            return {
                text: "followed %%login%%",
                data: {
                    login: event.payload.target.login,
                    name: event.payload.target.name
                },
                html_url: GITHUB_DOMAIN + "/" + event.payload.target.login
            };
            break;
        case 'IssuesEvent':
        case 'PullRequestEvent':
            switch (event.payload.action) {
                case 'opened':
                case 'reopened':
                    return {
                        text: "opened issue on %%repository%%",
                        data: {
                            repository: repo
                        },
                        html_url: (event.payload.pull_request || event.payload.issue).html_url
                    };
                case 'closed':
                    return {
                        text: "closed issue on %%repository%%",
                        data: {
                            repository: repo
                        },
                        html_url: (event.payload.pull_request || event.payload.issue).html_url
                    };
            }
            break;
        case 'GistEvent':
            switch (event.payload.action) {
                case 'create':
                    return {
                        text: "created %%name%%",
                        data: {
                            name: event.payload.name
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'update':
                    return {
                        text: "updated %%name%%",
                        data: {
                            name: event.payload.name
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'fork':
                    return {
                        text: "forked %%name%%",
                        data: {
                            name: event.payload.name
                        },
                        html_url: event.payload.gist.html_url
                    };
            }
            break;
        case 'WikiEvent':
        case 'GollumEvent':
            if (event.payload.pages.some(function (page) {
                return page.action === "created";
            })) {// created
                return {
                    text: "created a wiki page on %%repository%%",
                    data: {
                        repository: repo
                    },
                    html_url: event.payload.pages[0].html_url

                };
            } else { // edited
                return {
                    text: "edited a wiki page on %%repository%%",
                    data: {
                        repository: repo
                    },
                    // https://github.com/Constellation/escodegen/wiki/_compare/8071c6feb719b3c9e1742620aab9c1bbfda80e70...a567b1a221885a9ae5c576561e18ce68909624b6
                    html_url: GITHUB_DOMAIN + "/" + repo
                        + "/wiki/_compare/" + event.payload.pages[0].sha + "..." + event.payload.pages[event.payload.pages.length].sha
                };
            }
            break;
        case 'IssueCommentEvent':
        case 'CommitCommentEvent':
        case 'PullRequestReviewCommentEvent':
            return {
                text: "commented on %%repository%%",
                data: {
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };

        case 'DeleteEvent':
            switch (event.payload.ref_type) {
                case 'branch':
                    return {
                        text: "deleted branch %%ref%% at %%repository%%",
                        data: {
                            ref: event.payload.ref,
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
            }
            break;
        case 'PublicEvent':
            return {
                text: "open sourced %%repository%%",
                data: {
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo
            };
        case 'DownloadEvent':
            return {
                text: "created download %%name%%",
                data: {
                    name: event.payload.download.name
                },
                html_url: event.payload.download.html_url
            };
    }

    console.warn('Event:' + event.type, event);
    // Dummy Object
    return {
        text: "Dummy!! " + event.type
    }
}

function compile(event) {
    var object = parse(event);
    var userName = event.actor.login;
    var keys = Object.keys(object.data);
    var result = object.text;
    keys.forEach(function (key) {
        result = result.replace("%%" + key + "%%", object.data[key]);
    });
    return userName + " " + result;
}
module.exports.parse = parse;
module.exports.compile = compile;
