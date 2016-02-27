# StubbyLegs

## Application Planning

1. Answer Questions
	- What are we building?
	- Who are we building it for?
	- What features do we need to have?

### Questions

	1. What are we building? We are building a website where users can share and discuss pictures of corgis.

	2. Who are we building it for? We are building this website for members of the online corgi community.

	3. What features do we want to have?
		- Posts
			- Create / Edit / Destroy
			- Comments
			- Support Images / GIFs
			- Flag as Inappropriate
			- Upvote / Downvote

		- Comments
			- Create / Edit / Destroy

		- Users (Devise)
			- Admin User Edit / Destroy Posts & Comments
			- Create User#Show to display User's Posts & Comments

### User Stories

	As a blank, I want to be able to blank, so that blank.

		- As a user, I want to be able to create posts so that I can share pictures of corgis.
		- As a user, I want to be able to edit & destroy posts that I create.
		- As a user, I want to be able to comment on Posts.
		- As a user, I want to be able to upvote or downvote a Post.
		- As a user, I want to be able to flag a Post as inappropriate.
		- As an admin, I want to be able to Edit / Delete a Post created by another user.
		- As an admin, I want to be able to Edit / Delete a Comment created by another user.
		- As an admin, I want to be able to Review, Unflag & Delete a Flagged Post.
		- As an admin, I want to be able to Ban a User.

### Modeling our Data

	**Post**
		title:string
		description:text
		image:attachment (PaperClip)
		source:string

		belongs_to :user
		has_many :comments
		has_many :flagged_posts
		acts_as_votable

	**FlaggedPost**
		comment:text

		belongs_to :user
		belongs_to :post

	**Comment**
		comment:text

		belongs_to :user
		belongs_to :post
		acts_as_votable

	**FlaggedComment**	
		comment:text

		belongs_to :user
		belongs_to :comment

	**User** (Devise)
		admin:boolean
		banned:boolean
		avatar:attachment (Paperclip)

		has_many :posts
		has_many :comments
		has_many :flagged_posts

