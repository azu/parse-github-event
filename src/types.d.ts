declare namespace GithubApi {
  /**
   * EventType
   * @see https://developer.github.com/v3/activity/events/types/
   */

  const CheckRunEventType = 'CheckRunEvent'
  const CheckSuiteEventType = 'CheckSuiteEvent'
  const CommitCommentEventType = 'CommitCommentEvent'
  const ContentReferenceEventType = 'ContentReferenceEvent'
  const CreateEventType = 'CreateEvent'
  const DeleteEventType = 'DeleteEvent'
  const DeployKeyEventType = 'DeployKeyEvent'
  const DeploymentEventType = 'DeploymentEvent'
  const DeploymentStatusEventType = 'DeploymentStatusEvent'
  const DownloadEventType = 'DownloadEvent' // deprecated
  const FollowEventType = 'FollowEvent' // deprecated
  const ForkEventType = 'ForkEvent'
  const ForkApplyEventType = 'ForkApplyEvent' // deprecated
  const GitHubAppAuthorizationEventType = 'GitHubAppAuthorizationEvent'
  const GistEventType = 'GistEvent' // deprecated
  const GollumEventType = 'GollumEvent'
  const InstallationEventType = 'InstallationEvent'
  const InstallationRepositoriesEventType = 'InstallationRepositoriesEvent'
  const IssueCommentEventType = 'IssueCommentEvent'
  const IssuesEventType = 'IssuesEvent'
  const LabelEventType = 'LabelEvent'
  const MarketplacePurchaseEventType = 'MarketplacePurchaseEvent'
  const MemberEventType = 'MemberEvent'
  const MembershipEventType = 'MembershipEvent'
  const MetaEventType = 'MetaEvent'
  const MilestoneEventType = 'MilestoneEvent'
  const OrganizationEventType = 'OrganizationEvent'
  const OrgBlockEventType = 'OrgBlockEvent'
  const PageBuildEventType = 'PageBuildEvent'
  const ProjectCardEventType = 'ProjectCardEvent'
  const ProjectColumnEventType = 'ProjectColumnEvent'
  const ProjectEventType = 'ProjectEvent'
  const PublicEventType = 'PublicEvent'
  const PullRequestEventType = 'PullRequestEvent'
  const PullRequestReviewEventType = 'PullRequestReviewEvent'
  const PullRequestReviewCommentEventType = 'PullRequestReviewCommentEvent'
  const PushEventType = 'PushEvent'
  const ReleaseEventType = 'ReleaseEvent'
  const RepositoryEventType = 'RepositoryEvent'
  const RepositoryImportEventType = 'RepositoryImportEvent'
  const RepositoryVulnerabilityAlertEventType =
    'RepositoryVulnerabilityAlertEvent'
  const SecurityAdvisoryEventType = 'SecurityAdvisoryEvent'
  const StarEventType = 'StarEvent'
  const StatusEventType = 'StatusEvent'
  const TeamEventType = 'TeamEvent'
  const TeamAddEventType = 'TeamAddEvent'
  const WatchEventType = 'WatchEvent'

  /**
   * Common
   */

  interface Repo {
    id: number
    name: string
    url: string
  }

  interface Repository {
    id: number
    node_id: string
    name: string
    full_name: string
    private: boolean
    owner: User
    html_url: string
    description: string
    fork: boolean
    url: string
    forks_url: string
    keys_url: string
    collaborators_url: string
    teams_url: string
    hooks_url: string
    issue_events_url: string
    events_url: string
    assignees_url: string
    branches_url: string
    tags_url: string
    blobs_url: string
    git_tags_url: string
    git_refs_url: string
    trees_url: string
    statuses_url: string
    languages_url: string
    stargazers_url: string
    contributors_url: string
    subscribers_url: string
    subscription_url: string
    commits_url: string
    git_commits_url: string
    comments_url: string
    issue_comment_url: string
    contents_url: string
    compare_url: string
    merges_url: string
    archive_url: string
    downloads_url: string
    issues_url: string
    pulls_url: string
    milestones_url: string
    notifications_url: string
    labels_url: string
    releases_url: string
    deployments_url: string
    created_at: Date
    updated_at: Date
    pushed_at: Date
    git_url: string
    ssh_url: string
    clone_url: string
    svn_url: string
    homepage: string
    size: number
    stargazers_count: number
    watchers_count: number
    language: any
    has_issues: boolean
    has_projects: boolean
    has_downloads: boolean
    has_wiki: boolean
    has_pages: boolean
    forks_count: number
    mirror_url: any
    archived: boolean
    disabled: boolean
    open_issues_count: number
    license: any
    forks: number
    open_issues: number
    watchers: number
    default_branch: string
    public: boolean
  }

  interface Actor {
    id: number
    login: string
    display_login: string
    gravatar_id: string
    avatar_url: string
    url: string
  }

  interface Org {
    id: number
    login: string
    gravatar_id: string
    url: string
    avatar_url: string
  }

  /**
   * @see https://developer.github.com/v3/users/
   */
  interface User {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean

    name?: string
    company?: string
    blog?: string
    location?: string
    email?: string
    hireable?: boolean
    bio?: string
    public_repos?: number
    public_gists?: number
    followers?: number
    following?: number
    created_at?: Date
    updated_at?: Date
  }

  /**
   * @see https://developer.github.com/v3/issues/
   */
  interface Issue {
    url: string
    repository_url: string
    labels_url: string
    comments_url: string
    events_url: string
    html_url: string
    id: number
    node_id: string
    number: number
    title: string
    user: User
    labels: any[]
    state: string
    locked: boolean
    assignee: any
    assignees: any[]
    milestone: any
    comments: number
    created_at: Date
    updated_at: Date
    closed_at: any
    author_association: string
    body: string
  }

  /**
   * @see https://developer.github.com/v3/pulls/
   */
  interface PullRequest {
    url: string
    id: number
    node_id: string
    html_url: string
    diff_url: string
    patch_url: string
    issue_url: string
    number: number
    state: string
    locked: boolean
    title: string
    user: User
    body: string
    created_at: Date
    updated_at: Date
    closed_at: Date
    merged_at: any
    merge_commit_sha: string
    assignee: any
    assignees: any[]
    requested_reviewers: any[]
    requested_teams: any[]
    labels: any[]
    milestone: any
    commits_url: string
    review_comments_url: string
    review_comment_url: string
    comments_url: string
    statuses_url: string
    head: object
    base: object
    _links: object
    author_association: string
    merged: boolean
    mergeable: boolean
    rebaseable: boolean
    mergeable_state: string
    merged_by: any
    comments: number
    review_comments: number
    maintainer_can_modify: boolean
    commits: number
    additions: number
    deletions: number
    changed_files: number
  }

  /**
   * @see https://developer.github.com/v3/pulls/comments/
   */
  interface Comment {
    html_url: string
    url: string
    id: number
    node_id: string
    body: string
    path: string
    position: number
    line: number
    commit_id: string
    user: User
    created_at: Date
    updated_at: Date
  }

  /**
   * Event
   */

  interface BaseEvent {
    type: string
    payload: any
    id: string
    public: boolean
    repo: Repo
    actor: Actor
    org?: Org
    created_at: Date
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#createevent
   */
  interface CreateEvent extends BaseEvent {
    type: typeof CreateEventType
    payload:
      | {
          ref_type: 'repository'
          master_branch: 'master' | string
          description: string
        }
      | {
          ref_type: 'branch' | 'tag'
          ref: string
          master_branch: 'master' | string
          description: string
        }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#memberevent
   */
  interface MemberEvent extends BaseEvent {
    type: typeof MemberEventType
    payload: {
      member: User
      action: 'added' | 'deleted' | 'edited'
      changes?: object
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#pushevent
   */
  interface PushEvent extends BaseEvent {
    type: typeof PushEventType
    payload: {
      ref: 'refs/heads/master' | string
      head: string
      before: string
      size: number
      distinct_size: number
      commits: object[]
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#forkevent
   */
  interface ForkEvent extends BaseEvent {
    type: typeof ForkEventType
    payload: {
      forkee: Repository
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#watchevent
   */
  interface WatchEvent extends BaseEvent {
    type: typeof WatchEventType
    payload: {
      action: 'started'
    }
  }

  /**
   * @deprecated
   * @see https://developer.github.com/v3/activity/events/types/#followevent
   */
  interface FollowEvent extends BaseEvent {
    type: typeof FollowEventType
    payload: {
      target: User
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#issuesevent
   */
  interface IssuesEvent extends BaseEvent {
    type: typeof IssuesEventType
    payload: {
      action:
        | 'opened'
        | 'edited'
        | 'deleted'
        | 'transferred'
        | 'pinned'
        | 'unpinned'
        | 'closed'
        | 'reopened'
        | 'assigned'
        | 'unassigned'
        | 'labeled'
        | 'unlabeled'
        | 'locked'
        | 'unlocked'
        | 'milestoned'
        | 'demilestoned'
      issue: Issue
      changes?: object
      assignee?: object
      label?: object
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#pullrequestevent
   */
  interface PullRequestEvent extends BaseEvent {
    type: typeof PullRequestEventType
    payload: {
      action:
        | 'assigned'
        | 'unassigned'
        | 'review_requested'
        | 'review_request_removed'
        | 'labeled'
        | 'unlabeled'
        | 'opened'
        | 'edited'
        | 'closed'
        | 'ready_for_review'
        | 'locked'
        | 'unlocked'
        | 'reopened'
      number: number
      changes: object
      pull_request: PullRequest
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#gollumevent
   */
  interface GollumEvent extends BaseEvent {
    type: typeof GollumEventType
    payload: {
      pages: {
        page_name: string
        title: string
        action: 'created' | 'edited'
        sha: string
        html_url: string
      }[]
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#commitcommentevent
   */
  interface CommitCommentEvent extends BaseEvent {
    type: typeof CommitCommentEventType
    payload: {
      comment: Comment
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#pullrequestreviewcommentevent
   */
  interface PullRequestReviewCommentEvent extends BaseEvent {
    type: typeof PullRequestReviewCommentEventType
    payload: {
      action: 'created' | 'edited' | 'deleted'
      changes?: object
      pull_request: PullRequest
      comment: Comment
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#issuecommentevent
   */
  interface IssueCommentEvent extends BaseEvent {
    type: typeof IssueCommentEventType
    payload: {
      action: 'created' | 'edited' | 'deleted'
      changes?: object
      issue: Issue
      comment: Comment
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#deleteevent
   */
  interface DeleteEvent extends BaseEvent {
    type: typeof DeleteEventType
    payload: {
      ref_type: 'branch' | 'tag'
      ref: string
    }
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#publicevent
   */
  interface PublicEvent extends BaseEvent {
    type: typeof PublicEventType
    payload: null
  }

  /**
   * @see https://developer.github.com/v3/activity/events/types/#releaseevent
   */
  interface ReleaseEvent extends BaseEvent {
    type: typeof ReleaseEventType
    payload: {
      action:
        | 'published'
        | 'unpublished'
        | 'created'
        | 'edited'
        | 'deleted'
        | 'prereleased'
      changes?: object
      release: Release
    }
  }

  /**
   * @see https://developer.github.com/v3/repos/releases/
   */
  interface Release {
    url: string
    html_url: string
    assets_url: string
    upload_url: string
    tarball_url: string
    zipball_url: string
    id: number
    node_id: string
    tag_name: string
    target_commitish: string
    name: string
    body: string
    draft: boolean
    prerelease: boolean
    created_at: Date
    published_at: Date
    author: User
    assets: ReleaseAsset[]
  }

  interface ReleaseAsset {
    url: string
    browser_download_url: string
    id: number
    node_id: string
    name: string
    label: string
    state: string
    content_type: string
    size: number
    download_count: number
    created_at: Date
    updated_at: Date
    uploader: User
  }

  type OtherEventType =
    | typeof CheckRunEventType
    | typeof CheckSuiteEventType
    | typeof ContentReferenceEventType
    | typeof DeployKeyEventType
    | typeof DeploymentEventType
    | typeof DeploymentStatusEventType
    | typeof DownloadEventType
    | typeof ForkApplyEventType
    | typeof GitHubAppAuthorizationEventType
    | typeof GistEventType
    | typeof InstallationEventType
    | typeof InstallationRepositoriesEventType
    | typeof LabelEventType
    | typeof MarketplacePurchaseEventType
    | typeof MembershipEventType
    | typeof MetaEventType
    | typeof MilestoneEventType
    | typeof OrganizationEventType
    | typeof OrgBlockEventType
    | typeof PageBuildEventType
    | typeof ProjectCardEventType
    | typeof ProjectColumnEventType
    | typeof ProjectEventType
    | typeof PullRequestReviewEventType
    | typeof RepositoryEventType
    | typeof RepositoryImportEventType
    | typeof RepositoryVulnerabilityAlertEventType
    | typeof SecurityAdvisoryEventType
    | typeof StarEventType
    | typeof StatusEventType
    | typeof TeamEventType
    | typeof TeamAddEventType

  interface OtherEvent extends BaseEvent {
    type: OtherEventType
  }

  type GithubEvent =
    | CreateEvent
    | MemberEvent
    | PushEvent
    | ForkEvent
    | WatchEvent
    | FollowEvent
    | IssuesEvent
    | PullRequestEvent
    | GollumEvent
    | CommitCommentEvent
    | PullRequestReviewCommentEvent
    | IssueCommentEvent
    | DeleteEvent
    | PublicEvent
    | ReleaseEvent
    | OtherEvent
}
export interface ParsedEvent {
  login: string
  text: string
  data: { [x: string]: string | number }
  html_url: string
}
