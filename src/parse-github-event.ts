import { GithubApi, ParsedEvent } from "./types";

const GITHUB_DOMAIN = "https://github.com";

export function parse(event: GithubApi.GithubEvent): ParsedEvent | undefined {
    const repo = event.repo.name;
    const login = event.actor.login;
    switch (event.type) {
        case 'CreateEvent':
            switch (event.payload.ref_type) {
                case 'repository':
                    return {
                        login,
                        text: "created repo {{repository}}",
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
                case 'tag':
                    return {
                        login,
                        text: "created tag {{ref}} at {{repository}}",
                        data: {
                            ref: event.payload.ref,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/releases/tag/" + event.payload.ref
                    };
                case 'branch':
                    return {
                        login,
                        text: "created branch {{ref}} at {{repository}}",
                        data: {
                            ref: event.payload.ref,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/tree/" + event.payload.ref
                    };
            }
            break;
        case 'MemberEvent':
            return {
                login,
                text: "{{action}} {{member}} to {{repository}}",
                data: {
                    action: event.payload.action,
                    member: event.payload.member.login,
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + event.payload.member.login
            };
        case 'PushEvent':
            const branch = event.payload.ref.substr(event.payload.ref.lastIndexOf('/') + 1);
            return {
                login,
                text: "pushed to {{branch}} at {{repository}}",
                data: {
                    branch: branch,
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo + "/compare/" + event.payload.before + "..." + event.payload.head
            };
        case 'ForkEvent':
            return {
                login,
                text: "forked {{repository}}",
                data: {
                    repository: repo
                },
                html_url: event.payload.forkee.html_url
            };
        // https://developer.github.com/v3/activity/events/types/#watchevent
        case 'WatchEvent':
            switch (event.payload.action) {
                case 'started':
                    return {
                        login,
                        text: "starred {{repository}}",
                        data: {
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
            }
            break;
        case 'IssuesEvent':
            return {
                login,
                text: "{{action}} issue on {{repository}}#{{number}}",
                data: {
                    action: event.payload.action,
                    repository: repo,
                    number: event.payload.issue.number
                },
                html_url: event.payload.issue.html_url
            }
        case 'PullRequestEvent':
            return {
                login,
                text: "{{action}} pull request on {{repository}}#{{number}}",
                data: {
                    action: event.payload.action,
                    repository: repo,
                    number: event.payload.pull_request.number
                },
                html_url: event.payload.pull_request.html_url
            }
        case 'GollumEvent':
            if (event.payload.pages.some(page => page.action === "created")) { // created
                return {
                    login,
                    text: "created a wiki page on {{repository}}",
                    data: {
                        repository: repo
                    },
                    html_url: event.payload.pages[0].html_url
                };
            } else { // edited
                return {
                    login,
                    text: "edited a wiki page on {{repository}}",
                    data: {
                        repository: repo
                    },
                    // https://github.com/Constellation/escodegen/wiki/_compare/8071c6feb719b3c9e1742620aab9c1bbfda80e70...a567b1a221885a9ae5c576561e18ce68909624b6
                    html_url: GITHUB_DOMAIN + "/" + repo
                    + "/wiki/_compare/" + event.payload.pages[0].sha + "..." + event.payload.pages[event.payload.pages.length - 1].sha
                };
            }
        case 'CommitCommentEvent':
            return {
                login,
                text: "commented on {{repository}}",
                data: {
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };
        case 'PullRequestReviewCommentEvent':
            return {
                login,
                text: "{{action}} commented on {{repository}}",
                data: {
                    action: event.payload.action,
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };
        case 'IssueCommentEvent':
            return {
                login,
                text: "{{action}} commented on {{repository}}#{{number}}",
                data: {
                    action: event.payload.action,
                    repository: repo,
                    number: event.payload.issue.number
                },
                html_url: event.payload.comment.html_url
            };
        case 'DeleteEvent':
            switch (event.payload.ref_type) {
                case 'branch':
                    return {
                        login,
                        text: "deleted branch {{ref}} at {{repository}}",
                        data: {
                            ref: event.payload.ref,
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo
                    };
                case 'tag':
                    return {
                        login,
                        text: "deleted tag {{ref}} at {{repository}}",
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
                login,
                text: "open sourced {{repository}}",
                data: {
                    repository: repo
                },
                html_url: GITHUB_DOMAIN + "/" + repo
            };
        case 'ReleaseEvent':
            return {
                login,
                text: "{{action}} release {{tag_name}} at {{repository}}",
                data: {
                    action: event.payload.action,
                    tag_name: event.payload.release.tag_name,
                    repository: repo
                },
                html_url: event.payload.release.html_url
            };
    }
    return;
}

export function compile(parsedEvent: ParsedEvent) {
    const keys = Object.keys(parsedEvent.data);
    let result = parsedEvent.text;
    keys.forEach(function (key) {
        result = result.replace("{{" + key + "}}", (parsedEvent as any).data[key]);
    });
    return parsedEvent.login + " " + result;
}
