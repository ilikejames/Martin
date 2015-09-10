

var responseFactory = require('./responseFactory');
var dal = require('martinAppData');
var sentanceCreator = require('./sentanceCreator');



describe('responseFactory', function() {


	describe('sentanceCase', function() {

		it('Should properly sentance case a string of text', function() {
			expect(responseFactory.sentanceCase('gerhard')).toEqual('Gerhard');
			expect(responseFactory.sentanceCase('gerhard richter')).toEqual('Gerhard Richter');
			expect(responseFactory.sentanceCase('GERHARD RICHTER')).toEqual('Gerhard Richter');
		});

	});


	describe('getInitial', function() {

		var dt = new Date().getTime()-10000;

		beforeEach(function(done) {
		
			spyOn(dal.text, 'getIndex').andReturn(10);
			spyOn(dal.text, 'saveText').andReturn('saved');
			spyOn(dal.user, 'getLastSeen').andReturn(dt);
			spyOn(dal.user, 'getNewVisitorCount').andReturn(-100); 
			spyOn(dal.user, 'setLastSeen').andReturn(-1);
			spyOn(sentanceCreator, 'create').andReturn('A test sentance %s.');

			done();
		});

		it('It should return the default object', function(done) {

			responseFactory.getInitial('ausername')
			.then(function(data) {

				expect(dal.text.getIndex).toHaveBeenCalledWith('ausername');
				expect(dal.text.saveText).toHaveBeenCalledWith('ausername', 'A test sentance %s.');
				expect(dal.user.getLastSeen).toHaveBeenCalledWith('ausername');
				expect(dal.user.getNewVisitorCount).toHaveBeenCalledWith('ausername');
				expect(dal.user.setLastSeen).toHaveBeenCalledWith('ausername');
				expect(sentanceCreator.create).toHaveBeenCalled();

				expect(data).toEqual({
					index : 10+1,
					lastSeen : dt,
					totalCount : -100,
					sentance : 'A test sentance %s.', 
					name :'Ausername'
				});

				done();

			});

		});



	});



});