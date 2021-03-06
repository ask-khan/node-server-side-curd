/**
 * User Constructor.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */

function User ( app, message, Http, logger, db, User ) {
	this.app = app;
	this.Http = Http;
	this.message = message;
	this.logger = logger;
	this.db = db;
	this.User = User;	
}

/**
 * User Created Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.UserCreated = ( app, message, Http, logger, db, User ) => {

	/**
	 * @api {post} /userSave User save information.
	 * @apiName UserSave
	 * @apiGroup User
	 *
	 * @apiParam {String} First Name: User Firstname.
	 * @apiParam {String} Last Name: User Lastname.
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */
	
	app.post('/signUp', (req, res) => {

		// Create User Object.
		var newUser = new User({
  			fname: req.body.fname,
			lname: req.body.lname,
			username: req.body.username,
			password: req.body.password,
			email: req.body.email  
		});

		// call the built-in save method to save to the database
		newUser.save(function(err) {
			if ( err ) {

				var response = {};
				response.message = message.userNotSave;
				response.status = Http.BADREQUEST;

				res.status( Http.BADREQUEST ).json( response );
			} else {
				
				var response = {};
				response.message = message.userSave;
				response.status = Http.OK;

				res.status( Http.OK ).json( response  );
			}
						
		});

	});
};


/**
 * User Delete Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.UserDeleted = ( app, message, Http, logger, db, User ) => {
	
	/**
	 * @api {get} /userDelete/:id User delete with specific id.
	 * @apiName userDelete
	 * @apiGroup User
	 *
	 * @apiParam {String} __id: User Specific Id.
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */

	app.get('/userDelete/:id', app.oauth.authorise(), (req, res) => {

		User.findByIdAndRemove({ _id: req.params.id  },( err ) => {
			
			if ( err ) {
				
				var response = {};
	  			response.message = message.userNotDelete;
	  			response.status = Http.BADREQUEST;

	  			res.status( Http.BADREQUEST ).json( response );
			} else {
				var response = {};
	  			response.message = message.userDelete;
	  			response.status = Http.OK;

	  			res.status( Http.OK ).json( response );
			}

		});

	});
};

/**
 * User Information Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.UserGetInfo = ( app, message, Http, logger, db, User ) => {

	/**
	 * @api {get} /userInfo/ Get all user information.
	 * @apiName userDelete
	 * @apiGroup User
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */
	app.get( '/userInfo/', app.oauth.authorise(),( req, res ) => {

		User.find({}, ( err, doc ) => {
			if ( err ) {
				
				var response = {};
	  			response.message = message.userNotGetInfo;
	  			response.status = Http.BADREQUEST;

	  			res.status( Http.BADREQUEST ).json( response );
			} else {

				var response = {};
		  		response.message = message.userGetInfo;
	  			response.data = doc;
	  			response.status = Http.OK;

	  			res.status( Http.OK ).json( response );
			}

		});
	});
};	

/**
 * User Update Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.UserUpdateInfo = ( app, message, Http, logger, db, User ) => {

	/**
	 * @api {get} /UserUpdateInfo/:id User update with specific id.
	 * @apiName userUpdate
	 * @apiGroup User
	 *
	 * @apiParam {String} __id: User Specific Id.
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */
	app.get('/UserUpdateInfo/:id', app.oauth.authorise(), ( req, res ) => {
		
		User.findOneAndUpdate({ _id: req.params.id }, { $set: { fname: 'Ahmed Saboor Khan' }}, ( err, doc ) => {
			
			if ( err ) {
				
				var response = {};
				response.message = message.UserNotUpdated;
				response.status = Http.BADREQUEST;

				res.status( Http.BADREQUEST ).json( response );

			} else {

				var response = {};
				response.message = message.UserUpdated;
				response.status = Http.OK;

				res.status( Http.OK ).json( response );
			}
		});
			
	});

};

/**
 * User Login Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.userLoginInfo = ( app, message, Http, logger, db, User ) => {

	/**
	 * @api {post} /login/ User login.
	 * @apiName userLoginInfo
	 * @apiGroup User
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */
	app.post('/login', app.oauth.authorise(), (req, res) => {
		
		User.findOne({ 'username': req.body.username, 'password': req.body.password } ,( err, doc ) => {
			
			if ( err ) {
				
				var response = {};
				response.message = message.userNotFound;
				response.status = Http.BADREQUEST;

				res.status( Http.BADREQUEST ).json( response );

			} else {
				// Create Session.
				req.session.id = doc._id;
				req.session.email = doc.email;
				
				var response = {};
				response.message = message.UserFound;
				response.status = Http.OK;

				res.status( Http.OK ).json( response );
			}
		});

	});
};

/**
 * User Logout Function.
 * @param {app} Express Object. 
 * @param {message} Standard Message Object.
 * @param {http} Standard Api Status Code.
 * @param {logger} Logger Object.
 * @param {db} Database Object.
 * @param {User} User Model Object.
 * @return None
 */
User.prototype.userLogoutInfo = ( app, message, Http, logger, db, User ) => {

	/**
	 * @api {post} /logout/ User logout.
	 * @apiName userLogoutInfo
	 * @apiGroup User
	 *
	 * @apiSuccess {Object} Sucess message with status code.
	 */
	app.post('/logout', app.oauth.authorise(), (req, res) => {
		
		// Destory session.
		req.session.destory();

		var response = {};
		response.message = message.userLogoutSuccess;
		response.status = Http.OK;

		res.status( Http.OK  ).json( response );

	});
};

module.exports = User;