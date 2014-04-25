/**
 * Created by azu on 2014/04/26.
 * LICENSE : MIT
 */
"use strict";
var parseGithubEvent = require("../parse-github-event");
var assert = require("power-assert");
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
                console.log(result);
                assert("data" in result);
                assert("repository" in result.data);
            });
        });
    });
    describe("#compile", function () {
        var pullRequestEvent = require("./fixtures/pull-request.json");
        context("when event type is pull request", function () {
            it("should return string", function () {
                var result = parseGithubEvent.compile(pullRequestEvent);
                assert(typeof result === "string");
            });
            it("should return message", function () {
                var result = parseGithubEvent.compile(pullRequestEvent);
                var parsed = parseGithubEvent.parse(pullRequestEvent);
                assert.equal(result, pullRequestEvent.actor.login + " opened issue on " + parsed.data.repository);
            });
        });
    });
});