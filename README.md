# README
Name
====
chat-space2(Tech Expert Curriculum, Chat App, Completed)

## Demo
[![Image from Gyazo](https://i.gyazo.com/d94fa79c289d2cf6d6cfbd0b0fd437b2.png)](https://gyazo.com/d94fa79c289d2cf6d6cfbd0b0fd437b2)

![chatspace-新規作成](https://user-images.githubusercontent.com/47352093/56942937-327f2c00-6b58-11e9-9c52-305c600eea41.gif)

## Overview
- New user registration, edit
- Login, Logout
- Create group, edit
- Incremental search
- Post message
- Image upload
- Display flash message
- Post asynchronous communication
- Automatic update every 5 seconds
- Auto scroll when posting, auto update

## Description
- New user registration, edit-User can post new or edit
- Login, Logout-Each function is available by logging in
- Create group, edit-You can create a new group from the left sidebar icon and edit from the edit button next to the group name
- Incremental search-User suggestions will be displayed each time you type a letter when creating a new group or editing a group
- Post message-Posting function will be available by new registration and group creation
- Image upload-You can upload one saved file from the icon beside the post form
- Display flash message-A flash message will be displayed according to the screen to improve usability
- Post asynchronous communication-Asynchronous communication is realized by jquery and ajax communication. Operation becomes lighter and usability improves.
- Automatic update every 5 seconds-Automatically capture and reflect other users' posts
- Auto scroll when posting, auto update-You can check new posts immediately by automatic scrolling

## Dependency
- ruby 2.5.1p57 (2018-03-29 revision 63029) [x86_64-darwin18]
- Rails 5.0.7.2

## Database

### messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_up|integer|null: false, refference|
|user_id|integer|null: false, refference|

#### Association
- belongs_to :group
- belongs_to :user

### usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|strinng|null: false|
|Email|string|null: false, unique: true|
|password|string|null: false|

#### Association
- has_many :messages
- has_many :groups, through: :members
- has_many :members

### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

#### Association
- has_many :messages
- has_many :users, through: :members
- has_many :members
accepts_nested_attributes_for :members

### membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, refference|
|group_id|integer|null: false, refference|

#### Association
- belongs_to :group
- belongs_to :user

## Author

[syoji-haruki](https://github.com/syoji-haruki)

<!-- # README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
 -->
