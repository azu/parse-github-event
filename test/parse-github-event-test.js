/**
 * Created by azu on 2014/04/26.
 * LICENSE : MIT
 */
"use strict";
var parseGithubEvent = require("../lib/parse-github-event");
var assert = require("assert");
describe("parse-github-event", function () {
    describe("#parse", function () {
        var pullRequestEvent = require("./fixtures/pull-request.json");
        context("when event type is pull request", function () {
            it("should return object", function () {
                var result = parseGithubEvent.parse(pullRequestEvent);
                assert(typeof result === "object");
            });
            it("should has repository data", function () {
                var result = parseGithubEvent.parse(pullRequestEvent);
                assert("data" in result);
                assert("repository" in result.data);
                assert(result.html_url.length > 0);
            });
        });
    });
    describe("#compile", function () {
        var pullRequestEvent = require("./fixtures/pull-request.json");
        context("when event type is pull request", function () {
            it("should return string", function () {
                var parsed = parseGithubEvent.parse(pullRequestEvent);
                var result = parseGithubEvent.compile(parsed);
                assert(typeof result === "string");
            });
            it("should return message", function () {
                var parsed = parseGithubEvent.parse(pullRequestEvent);
                var result = parseGithubEvent.compile(parsed);
                assert.equal(result, pullRequestEvent.actor.login + " opened issue on " + parsed.data.repository + "#" + parsed.data.number);
            });
        });
    });
});