"use strict";
const GITHUB_DOMAIN = "https://github.com";


export interface Repo {
    id: number;
    name: string;
    url: string;
}

export interface Actor {
    id: number;
    login: string;
    gravatar_id: string;
    avatar_url: string;
    url: string;
}

export interface Org {
    id: number;
    login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
}

export type EventType =
    | "CommitCommentEvent"
    | "CreateEvent"
    | "DeleteEvent"
    | "DeploymentEvent"
    | "DeploymentStatusEvent"
    | "DownloadEvent"
    | "FollowEvent"
    | "ForkEvent"
    | "ForkApplyEvent"
    | "GistEvent"
    | "GollumEvent"
    | "InstallationEvent"
    | "InstallationRepositoriesEvent"
    | "IssueCommentEvent" //
    | "IssuesEvent" //
    | "LabelEvent" //
    | "MarketplacePurchaseEvent"
    | "MemberEvent"
    | "MembershipEvent"
    | "MilestoneEvent"
    | "OrganizationEvent"
    | "OrgBlockEvent"
    | "PageBuildEvent"
    | "ProjectCardEvent"
    | "ProjectColumnEvent"
    | "ProjectEvent"
    | "PublicEvent"
    | "PullRequestEvent" //
    | "PullRequestReviewEvent" //
    | "PullRequestReviewCommentEvent" //
    | "PushEvent" //
    | "ReleaseEvent" //
    | "RepositoryEvent"
    | "StatusEvent"
    | "TeamEvent"
    | "TeamAddEvent"
    | "WatchEvent";

export interface Event {
    id: string;
    type: EventType;
    public: boolean;
    payload: any;
    repo: Repo;
    actor: Actor;
    org: Org;
    created_at: string;
}

export interface ParsedEvent {
    login: string;
    text: string,
    data: object,
    html_url: string
}

export function parse(event: Event): ParsedEvent | undefined {
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
                        text: "created tag {{ref_type}} at {{repository}}",
                        data: {
                            ref_type: event.payload.ref_type,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + repo + "/releases/tag/" + event.payload.ref
                    };
                case 'branch':
                    return {
                        login,
                        text: "created branch {{ref_type}} at {{repository}}",
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
                        login,
                        text: "added {{member}} to {{repository}}",
                        data: {
                            member: event.payload.member,
                            repository: repo
                        },
                        html_url: GITHUB_DOMAIN + "/" + event.payload.member.login
                    };
            }
            break;
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
        case 'ForkApplyEvent':
            return {
                login,
                text: "merged to {{repository}}",
                data: {
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
        case 'FollowEvent':
            return {
                login,
                text: "followed {{login}}",
                data: {
                    login: event.payload.target.login,
                    name: event.payload.target.name
                },
                html_url: GITHUB_DOMAIN + "/" + event.payload.target.login
            };
        case 'IssuesEvent':
        case 'PullRequestEvent':
            const payloadObject = (event.payload.pull_request || event.payload.issue);
            switch (event.payload.action) {
                case 'opened':
                case 'reopened':
                    return {
                        login,
                        text: "opened issue on {{repository}}#{{number}}",
                        data: {
                            repository: repo,
                            number: payloadObject.number
                        },
                        html_url: payloadObject.html_url
                    };
                case 'closed':
                    return {
                        login,
                        text: "closed issue on {{repository}}#{{number}}",
                        data: {
                            repository: repo,
                            number: payloadObject.number
                        },
                        html_url: payloadObject.html_url
                    };
            }
            break;
        case 'GistEvent':
            switch (event.payload.action) {
                case 'create':
                    return {
                        login,
                        text: "created gist:{{id}}",
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'update':
                    return {
                        login,
                        text: "updated gist:{{id}}",
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
                case 'fork':
                    return {
                        login,
                        text: "forked gist:{{id}}",
                        data: {
                            id: event.payload.gist.id
                        },
                        html_url: event.payload.gist.html_url
                    };
            }
            break;
        case 'GollumEvent':
            if (event.payload.pages.some(function (page: any) {
                    return page.action === "created";
                })) {// created
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
                text: "commented on {{repository}}",
                data: {
                    repository: repo
                },
                html_url: event.payload.comment.html_url
            };
        case 'IssueCommentEvent':
            return {
                login,
                text: "commented on {{repository}}#{{number}}",
                data: {
                    repository: repo,
                    number: (event.payload.pull_request || event.payload.issue).number
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
        case 'DownloadEvent':
            return {
                login,
                text: "created download {{name}}",
                data: {
                    name: event.payload.download.name
                },
                html_url: event.payload.download.html_url
            };
        case 'ReleaseEvent':
            return {
                login,
                text: "created tag {{tag_name}} at {{repository}}",
                data: {
                    tag_name: event.payload.release.tag_name,
                    repository: repo
                },
                html_url: event.payload.release.html_url
            };
    }
    console.warn('Event:' + event.type, event);
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