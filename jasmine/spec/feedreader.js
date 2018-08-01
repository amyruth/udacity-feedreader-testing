/* feedreader.js*/

$(function () {

	describe('RSS Feeds', function () {

		it('are defined', function () {
			expect(allFeeds).toBeDefined();
		});

		it('does not have a length of 0', function () {
			expect(allFeeds.length).not.toBe(0);
		});

		it('have a URL in each feed object in the array', function () {
			for (let feed of allFeeds) {
				expect(feed.url).toBeDefined();
			}
		});

		it('have a name in each feed object in the array', function () {
			for (let feed of allFeeds) {
				expect(feed.name).toBeDefined();
			}
		});
	});

	describe('The menu', function () {

		const body = document.querySelector('body');
		const hamburger = document.querySelector('.menu-icon-link');

		it('is hidden by default', function () {
			expect(body.classList.contains('menu-hidden')).toBe(true);
		});

		//simulated a mouse click to test menu state
		it('is made visible when menu icon is clicked and hidden when clicked again', function () {
			//menu hidden before click
			hamburger.click();
			expect(body.classList.contains('menu-hidden')).toBe(false);

			//menu open before click
			hamburger.click();
			expect(body.classList.contains('menu-hidden')).toBe(true);
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
		//each feed variable should have different text content.
		beforeEach(function (done) {
			loadFeed(1, function () {
				feed1 = document.querySelector('.feed').textContent;

				loadFeed(2, function () {
					feed2 = document.querySelector('.feed').textContent;
					done();
				});
			});
		});

		it('ensures a new feed is loaded to the page', function () {
			expect(feed1 === feed2).toBeFalsy();
		});
	});
}());