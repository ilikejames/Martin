Martin
------

Boilerplate outline for a node & angular project

## Setup

1. create a .env_local file with the settings, e.g.
	
	```
	export NODE_ENV=local # local | local_production | production
	export PORT=8001
	export S3BUCKET=//s3-eu-west-1.amazonaws.com/
	export STATIC_PATH_LOCAL=public
	export STATIC_PATH_PRODUCTION=$S3BUCKET
	```

2. ``npm install karma-jasmine --save-dev``

3. ``npm install``

4. Run the tests! 

	``karma start``

5. Run the server!

	```
	source.env_local
	grunt server
	```

