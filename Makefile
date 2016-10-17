AWS_ACCESS_KEY_ID?="$(DOTBC_AWS_ACCESS_KEY_ID)"
AWS_BUCKET?="$(DOTBC_AWS_BUCKET)"
AWS_IAM_USER=dotbc-queue
AWS_SECRET_ACCESS_KEY?="$(DOTBC_AWS_SECRET_ACCESS_KEY)"
DEBUG?=site:*
HOSTNAME?="dotbc-queue.herokuapp.com"
MAILGUN_API_KEY?="$(MAILGUN_API_KEY)"
MAILGUN_DOMAIN?="$(MAILGUN_DOMAIN)"
NODE_ENV?=development

run: start

start: 
	AWS_ACCESS_KEY_ID=$(AWS_ACCESS_KEY_ID) \
	AWS_BUCKET=$(AWS_BUCKET) \
	AWS_SECRET_ACCESS_KEY=$(AWS_SECRET_ACCESS_KEY) \
	DEBUG=$(DEBUG) \
	HOSTNAME=$(HOSTNAME) \
	MAILGUN_API_KEY=$(MAILGUN_API_KEY) \
	MAILGUN_DOMAIN=$(MAILGUN_DOMAIN) \
	NODE_ENV=$(NODE_ENV) \
	npm run dev;

.PHONY: test
