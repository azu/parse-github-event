# parse-github-event [![Build Status](https://travis-ci.org/azu/parse-github-event.svg)](https://travis-ci.org/azu/parse-github-event)

Small library to parse [Event Types](https://developer.github.com/v3/activity/events/types/ "Event Types") from Github API response.

## Feature

- Parse event json and built message and html_url without addtional request
- Create human-readable message like GitHub's timeline from event json

## Installation

``` sh
npm install parse-github-event
```

## Usage

Response json object of [GitHub Events API](https://developer.github.com/v3/activity/events/).

``` json
{
    "id": "2070416128",
    "type": "PullRequestEvent",
    "actor": {
        "id": 1062518,
        "login": "pivotal-brian-croom",
        "gravatar_id": "92d36bd6d9b53539fcec282452872710",
        "url": "https://api.github.com/users/pivotal-brian-croom",
        "avatar_url": "https://avatars.githubusercontent.com/u/1062518?"
    },
    "repo": {
        "id": 708684,
        "name": "pivotal/cedar",
        "url": "https://api.github.com/repos/pivotal/cedar"
    },
    "payload": {
        "action": "opened",
        "number": 231,
        "pull_request": {
            "url": "https://api.github.com/repos/pivotal/cedar/pulls/231",
            "body": "- Common code consolidated into CDROTestRunner and CDROTestIPhoneRunner\r\n- CDROTestIPhoneRunner subclasses CDROTestRunner\r\n[#67878220]\r\n\r\nThoughts?\r\n@idoru, @jeffh",
            "created_at": "2014-04-24T05:01:39Z",
            "updated_at": "2014-04-24T05:01:39Z",
    ...
}
```

### Parse response

``` js
var parseGithubEvent = require("parse-github-event");
// responseJSON is come from https://developer.github.com/v3/activity/events/
var parsed = parseGithubEvent.parse(responseJSON);
/*
{
    text: 'opened issue on %%repository%%',
    data: { repository: 'pivotal/cedar' },
    html_url : 'https://github.com/pivotal/cedar/pull/231'
}
*/
```

### Create message

It's bonus method.

``` js
var parseGithubEvent = require("parse-github-event");
var result = parseGithubEvent.compile(json);
// pivotal-brian-croom opened issue on pivotal/cedar
```

## UseCase

Create one-line message and html_url from event response.

- [azu/github-to-twitter-lambda: Lambda bot that fetch own GitHub notifications/events and post to Twitter.](https://github.com/azu/github-to-twitter-lambda)
- [azu/faao: Faao is a GitHub issue/pull-request client on Electron.](https://github.com/azu/faao)
- [lawvs/buddy-github-events: View broadcast/received GItHub events from other people or organizations.](https://github.com/lawvs/buddy-github-events)

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

Thanks for [alindeman/github-timeline-widget](https://github.com/alindeman/github-timeline-widget "alindeman/github-timeline-widget").

Use these as a reference

* https://github.com/FenrirUnbound/github-feed/tree/FixPath/test/mocks
* https://github.com/limbo0312/gitBox/tree/master/ioctocat2/iOctocatUnitTests/Fixtures
* https://github.com/octokit/go-octokit/tree/master/fixtures
* https://github.com/chamerling/QuickHubApp
* https://github.com/linyows/octospy/tree/master/spec/fixtures
* https://github.com/octokit/octokit.objc/tree/master/OctoKitTests/Stubs
* https://github.com/octokit/octokit.net/tree/master/Octokit.Tests/Fixtures
