import alternate from '../alternate.js';

describe('PDF Alternate Plugin', function() {

	it('does not handle non-PDF files', function() {
		var result = alternate.test('foo/bar');
		expect(result).toBeFalsy();
	});

	it('does handle PDF files', function() {
		var result = alternate.test('application/pdf');
		expect(result).toBeTruthy();
	});

	it('returns a viewer', function() {
		var viewer = alternate.getComponent({
			src: 'test.pdf'
		});
		expect(viewer).toBeDefined();
	});

});
