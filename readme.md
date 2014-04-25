# parse-github-event

 Small library to parse [Event Types](https://developer.github.com/v3/activity/events/types/#watchevent "Event Types") which is Github API response.

## Installation

``` sh
npm install parse-github-event
```

## Usage

json object
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

### parse

``` js
var parseGithubEvent = require("parse-github-event");
var parsed = parseGithubEvent.parse(json);
/*
{
    text: 'opened issue on %%repository%%',
    data: { repository: 'pivotal/cedar' }
}
*/
```

### compile

It's bonus method.

``` js
var parseGithubEvent = require("parse-github-event");
var result = parseGithubEvent.compile(json);
// pivotal-brian-croom opened issue on pivotal/cedar
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

Thanks for [alindeman/github-timeline-widget](https://github.com/alindeman/github-timeline-widget "alindeman/github-timeline-widget").