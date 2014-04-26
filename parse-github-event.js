"use strict";
function parse(event) {
    var repo = event.repo.name;
    switch (event.type) {
        case 'CreateEvent':
            switch (event.payload.ref_type) {
                case 'repository':
                    return {
                        "text": "created repo %%repository%%",
                        "data": {
                            repository: repo
                        }
                    };
                case 'tag':
                    return {
                        text: "created tag %%ref_type%% at %%repository%%",
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        }
                    };
                case 'branch':
                    return {
                        text: "created branch %%ref_type%% at %%repository%%",
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        }
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
                        }
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
                }
            };
            break;
        case 'ForkApplyEvent':
            return {
                text: "merged to %%repository%%",
                data: {
                    repository: repo
                }
            };
            break;
        case 'ForkEvent':
            return {
                text: "forked %%repository%%",
                data: {
                    repository: repo
                }
            };
            break;
        case 'WatchEvent':
            switch (event.payload.action) {
                case 'started':
                    return {
                        text: "started watching %%repository%%",
                        data: {
                            repository: repo
                        }
                    };
                    break;
                case 'stopped':
                    return {
                        text: "stopped watching %%repository%%",
                        data: {
                            repository: repo
                        }
                    };
            }
            break;
        case 'FollowEvent':
            return {
                text: "followed %%login%%",
                data: {
                    login: event.payload.target.login,
                    name: event.payload.target.name
                }
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
                        }
                    };
                case 'closed':
                    return {
                        text: "closed issue on %%repository%%",
                        data: {
                            repository: repo
                        }
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
                        }
                    };
                case 'update':
                    return {
                        text: "updated %%name%%",
                        data: {
                            name: event.payload.name
                        }
                    };
                case 'fork':
                    return {
                        text: "forked %%name%%",
                        data: {
                            name: event.payload.name
                        }
                    };
            }
            break;
        case 'WikiEvent':
        case 'GollumEvent':
            switch (event.payload.pages[0].action) {
                case 'created':
                    return {
                        text: "created a wiki page on %%repository%%",
                        data: {
                            repository: repo
                        }
                    };
                case 'edited':
                    return {
                        text: "edited a wiki page on %%repository%%",
                        data: {
                            repository: repo
                        }
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
                }
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
                        }
                    };
            }
            break;
        case 'PublicEvent':
            return {
                text: "open sourced %%repository%%",
                data: {
                    repository: repo
                }
            };
        case 'DownloadEvent':
            return {
                text: "created download %%name%%",
                data: {
                    name: event.payload.download.name
                }
            };
    }

    console.warn('Event:' + event.type, event);
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
