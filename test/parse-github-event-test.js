/**
 * Created by azu on 2014/04/26.
 * LICENSE : MIT
 */
const parseGithubEvent = require("../lib/parse-github-event");
const assert = require("assert");
describe("parse-github-event", function () {
    describe("#parse", function () {
        context("when event type is PullRequestEvent", function () {
            const pullRequestEvent = require("./fixtures/PullRequestEvent.json");
            const result = parseGithubEvent.parse(pullRequestEvent);
            it("should has correct login", function () {
                assert.equal(result.login, pullRequestEvent.actor.login);
            });
            it("should has correct text", function () {
                assert.equal(result.text, "{{action}} pull request on {{repository}}#{{number}}");
            });
            it("should has repository data", function () {
                assert(result.html_url.length > 0);
            });
        });

        context("when event type is WatchEvent", function () {
            const watchEvent = require("./fixtures/WatchEvent.json");
            const result = parseGithubEvent.parse(watchEvent);
            it("should has correct login", function () {
                assert.equal(result.login, watchEvent.actor.login);
            });
            it("should has correct text", function () {
                assert.equal(result.text, "starred {{repository}}");
            });
            it("should has repository data", function () {
                assert(result.html_url.length > 0);
            });
        });

        context("when event type is PushEvent", function () {
            const pushEvent = require("./fixtures/PushEvent.json");
            const result = parseGithubEvent.parse(pushEvent);
            it("should has correct login", function () {
                assert.equal(result.login, pushEvent.actor.login);
            });
            it("should has correct branch", function () {
                assert(pushEvent.payload.ref.includes(result.data.branch));
            });
            it("should has correct text", function () {
                assert.equal(result.text, "pushed to {{branch}} at {{repository}}");
            });
            it("should has repository data", function () {
                assert(result.html_url.length > 0);
            });
        });
    });
    describe("#compile", function () {
        const pullRequestEvent = require("./fixtures/PullRequestEvent.json");
        context("when event type is pull request", function () {
            it("should return string", function () {
                const parsed = parseGithubEvent.parse(pullRequestEvent);
                const result = parseGithubEvent.compile(parsed);
                assert(typeof result === "string");
            });
            it("should return message", function () {
                const parsed = parseGithubEvent.parse(pullRequestEvent);
                const result = parseGithubEvent.compile(parsed);
                assert.equal(result, pullRequestEvent.actor.login + " opened pull request on " + parsed.data.repository + "#" + parsed.data.number);
            });
        });
    });
});