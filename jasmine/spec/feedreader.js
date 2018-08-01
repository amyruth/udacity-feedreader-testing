/* feedreader.js*/

$(function () {

	describe('RSS Feeds', function () {

		it('are defined', function () {
			expect(allFeeds).toBeDefined();
		});

		it('does not have a length of 0', function () {
			expect(allFeeds.length).not.toBe(0);
		});

		//check that properties are defined and not empty strings
		it('has a URL in each feed object in the array', function () {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			}
		});

		it('has a name in each feed object in the array', function () {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			}
		});
	});

	describe('The menu', function () {

		const body = document.querySelector('body');
		const hamburgerMenu = document.querySelector('.menu-icon-link');

		it('is hidden by default', function () {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});

		//simulated a mouse click to test menu state
		//previous reviewed advised using jQuery instead of JS .contains, so I changed it(?)
		it('is made visible when menu icon is clicked and hidden when clicked again', function () {
			//menu hidden before click
			hamburgerMenu.click();
			expect($('body').hasClass('menu-hidden')).toBe(false);

			//menu open before click
			hamburgerMenu.click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});

	describe('Initial Entries', function () {

		//grab feed container and and run loadFeed
		let containerLength;

		beforeEach(function (done) {
			loadFeed(0, function () {
				containerLength = document.querySelectorAll('.feed .entry').length;
				done();
			});
		});

		//checks to see if at least one .entry element exists inside the .feed element
		it('contains at least one article with the class .entry', function () {
			expect(containerLength).not.toBeLessThan(1);
		});
	});

	describe('New Feed Selection', function () {

		let feed1;
		let feed2;

		//retrieve 2 feeds, save the information from both and compare them
		//each feed variable should have different content
		beforeEach(function (done) {
			loadFeed(1, function () {
				feed1 = document.querySelector('.feed').innerHTML;

				loadFeed(2, function () {
					feed2 = document.querySelector('.feed').innerHTML;
					done();
				});
			});
		});

		it('ensures a new feed is loaded to the page', function () {
			expect(feed1 === feed2).toBeFalsy();
		});
	});
}());