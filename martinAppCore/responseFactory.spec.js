

var responseFactory = require('./responseFactory');
var sentanceCreator = require('./sentanceCreator');


var dal = require('martinAppData');


describe('responseFactory', function(done) {


	describe('getTextItem', function(done) {

		var dt = new Date().getTime()-10000;

		beforeEach(function() {

			spyOn(dal.text, 'getTextForName').andReturn({index : 10,  text : 'A test sentance %s.'})
			spyOn(dal.user, 'getLastSeen').andReturn(dt);
			spyOn(dal.user, 'getNewVisitorCount').andReturn(-100); 
			spyOn(dal.user, 'setLastSeen').andReturn(-1);
			spyOn(sentanceCreator, 'create').andReturn('A test sentance %s.');
			
		});

		it('It should return the defined object', function(done) {

			responseFactory.getTextItem('ausername', 'not used')
			.then(function(data) {

				expect(dal.text.getTextForName).toHaveBeenCalledWith('ausername', 'A test sentance %s.');
				expect(dal.user.getLastSeen).toHaveBeenCalledWith('ausername');
				expect(dal.user.getNewVisitorCount).toHaveBeenCalledWith('ausername');
				expect(dal.user.setLastSeen).toHaveBeenCalledWith('ausername');
				expect(sentanceCreator.create).toHaveBeenCalled();

				expect(data).toEqual({
					index : 10,
					lastSeen : dt,
					totalCount : -100,
					text : 'A test sentance %s.', 
					name :'Ausername'
				});

				done();

			});

		});

	});

});