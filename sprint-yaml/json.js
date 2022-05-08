
module.exports = {
	test1: {
		Car: {
			Color: "Blue",
			Model: {
				Name: "Cyber Truck",
				Year: 2022
			},
			Fuel: "Electric",
			Price: "$100,000"
		}
	},

	test2: {
		Version: "2012-10-17",
		Statement: [
			{
				Effect: "Allow",
				Action: [
					"ec2:*",
					"elasticloadbalancing:*",
					"route53:*",
					"autoscaling:*",
					"cloudwatch:*",
					"SNS:*"
				],
				Resource: ["*"]
			},
			{
				Effect: "Allow",
				Action: ["s3:*"],
				Resource: [
					"arn:aws:s3:::travis-terraform-state",
					"arn:aws:s3:::travis-terraform-state/*",
					"arn:aws:s3:::travis-shared-1-registry-images",
					"arn:aws:s3:::travis-shared-1-registry-images/*",
					"arn:aws:s3:::travis-shared-2-registry-images",
					"arn:aws:s3:::travis-shared-2-registry-images/*"
				]
			},
			{
				Effect: "Allow",
				Action: ["iam:GetUser"],
				Resource: ["arn:aws:iam::341288657826:user/igor-terraform"]
			},
			{
				Effect: "Allow",
				Action: ["iam:*"],
				Resource: [
					"arn:aws:iam::341288657826:role/*",
					"arn:aws:iam::341288657826:user/registry-shared-1",
					"arn:aws:iam::341288657826:user/registry-shared-2",
					"arn:aws:iam::*:user/cyclist-*",
					"arn:aws:iam::*:user/worker-*",
					"arn:aws:iam::*:user/build-trace-*"
				]
			},
			{
				Effect: "Allow",
				Action: ["dynamodb:*"],
				Resource: [
					"arn:aws:dynamodb:us-east-1:341288657826:table/travis-terraform-state"
				]
			}
		]
	},

test3: {
		"name": "Node.js CI",
		"on": {
			"push": {
				"branches": "main"
			},
			"pull_request": {
				"branches": "main"
			}
		},
		"jobs": {
			"build": {
				"runs-on": "ubuntu-latest",
				"steps": [
					{
						"uses": "actions/checkout@v2"
					},
					{
						"name": "Use Node.js",
						"uses": "actions/setup-node@v1",
						"with": {
							"always-auth": true,
							"node-version": "12.x",
							"registry-url": "https://registry.npmjs.org",
							"scope": "@octocat"
						}
					},
					{
						"name": "Install dependencies",
						"run": "npm ci",
						"env": {
							"NODE_AUTH_TOKEN": "${{secrets.NPM_TOKEN}}"
						}
					}
				]
			}
		}
	}
};  


