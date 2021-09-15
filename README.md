jekyo
==========

JEKYO | Decentralized application platform

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/jekyo.svg)](https://npmjs.org/package/jekyo)
[![Downloads/week](https://img.shields.io/npm/dw/jekyo.svg)](https://npmjs.org/package/jekyo)
[![License](https://img.shields.io/npm/l/jekyo.svg)](https://github.com/jekyo/cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g jekyo
$ jekyo COMMAND
running command...
$ jekyo (-v|--version|version)
jekyo/0.2.0 linux-x64 node-v14.17.5
$ jekyo --help [COMMAND]
USAGE
  $ jekyo COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jekyo app:create`](#jekyo-appcreate)
* [`jekyo app:delete`](#jekyo-appdelete)
* [`jekyo app:list`](#jekyo-applist)
* [`jekyo app:logs`](#jekyo-applogs)
* [`jekyo app:status`](#jekyo-appstatus)
* [`jekyo deploy`](#jekyo-deploy)
* [`jekyo help [COMMAND]`](#jekyo-help-command)
* [`jekyo link`](#jekyo-link)
* [`jekyo login`](#jekyo-login)
* [`jekyo logs`](#jekyo-logs)
* [`jekyo status`](#jekyo-status)
* [`jekyo user:confirm`](#jekyo-userconfirm)
* [`jekyo user:recover`](#jekyo-userrecover)
* [`jekyo user:signin`](#jekyo-usersignin)
* [`jekyo user:signup`](#jekyo-usersignup)

## `jekyo app:create`

Creates a new application that can be deployed on jekyo

```
USAGE
  $ jekyo app:create

OPTIONS
  -n, --name=name  Application name
```

_See code: [src/commands/app/create.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/app/create.js)_

## `jekyo app:delete`

Deletes an existing application deployed on jekyo

```
USAGE
  $ jekyo app:delete

OPTIONS
  -n, --name=name  Application name
```

_See code: [src/commands/app/delete.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/app/delete.js)_

## `jekyo app:list`

Lists all applications that a user has created on jekyo

```
USAGE
  $ jekyo app:list
```

_See code: [src/commands/app/list.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/app/list.js)_

## `jekyo app:logs`

Retrieves the logs for a application deployed on jekyo

```
USAGE
  $ jekyo app:logs

OPTIONS
  -n, --name=name  jekyo application name
```

_See code: [src/commands/app/logs.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/app/logs.js)_

## `jekyo app:status`

Retrieves the status of a jekyo application

```
USAGE
  $ jekyo app:status

OPTIONS
  -n, --name=name  Application name
```

_See code: [src/commands/app/status.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/app/status.js)_

## `jekyo deploy`

Describe the command here

```
USAGE
  $ jekyo deploy

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/deploy.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/deploy.js)_

## `jekyo help [COMMAND]`

display help for jekyo

```
USAGE
  $ jekyo help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.3/src/commands/help.ts)_

## `jekyo link`

Links an existing application

```
USAGE
  $ jekyo link

OPTIONS
  -n, --name=name  Application name
```

_See code: [src/commands/link.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/link.js)_

## `jekyo login`

Sign in an existing jekyo user

```
USAGE
  $ jekyo login

OPTIONS
  -e, --email=email        jekyo account email
  -p, --password=password  jekyo account password
```

_See code: [src/commands/login.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/login.js)_

## `jekyo logs`

Describe the command here

```
USAGE
  $ jekyo logs

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/logs.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/logs.js)_

## `jekyo status`

Describe the command here

```
USAGE
  $ jekyo status

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/status.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/status.js)_

## `jekyo user:confirm`

Confirms the email of a jekyo account

```
USAGE
  $ jekyo user:confirm

OPTIONS
  -t, --token=token  Account confirmation token
```

_See code: [src/commands/user/confirm.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/user/confirm.js)_

## `jekyo user:recover`

Recover jekyo account password

```
USAGE
  $ jekyo user:recover

OPTIONS
  -p, --password=password  jekyo account password
```

_See code: [src/commands/user/recover.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/user/recover.js)_

## `jekyo user:signin`

Sign in an existing jekyo user

```
USAGE
  $ jekyo user:signin

OPTIONS
  -e, --email=email        jekyo account email
  -p, --password=password  jekyo account password
```

_See code: [src/commands/user/signin.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/user/signin.js)_

## `jekyo user:signup`

Sign up a new jekyo user

```
USAGE
  $ jekyo user:signup

OPTIONS
  -e, --email=email        your email address
  -n, --name=name          your full name
  -p, --password=password  your desired password
  -u, --username=username  your desired username
```

_See code: [src/commands/user/signup.js](https://github.com/jekyo/cli/blob/v0.2.0/src/commands/user/signup.js)_
<!-- commandsstop -->
