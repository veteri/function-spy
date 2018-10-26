class Spy {

	constructor() {
		this.TIME = {
			BEFORE: 0,
			AFTER: 1
		}
	}

	static isConstructor(Fn) {
		let instance = null;

		try {
			instance = new Fn();
		} catch (exception) {
			return false;
		}

		return true;
	}

	before(obj, method, callback) {
		this.on(obj, method, callback, this.TIME.BEFORE);
	}

	after(obj, method, callback) {
		this.on(obj, method, callback, this.TIME.AFTER);
	}

	/**
	 * Spy on a method on the given object.
	 * Execute a callback before the original fn.
	 * Only works for built-ins for now.
	 * @param obj
	 * @param method
	 * @param callback
	 * @param time
	 */
	on(obj = window, method = "", callback, time = this.TIME.BEFORE) {

		let self = this;

		//Save reference to original method
		let original = obj[method];

		//Overwrite the original property
		obj[method] = function() {

			//Save all args as array
			const args = Array.from(arguments);

			if (time === self.TIME.BEFORE) {
				//Call the cb in the context of the obj with args
				callback.call(obj, args);
			}

			//Special Check if called with new (Experimental)
			if (Spy.isConstructor(original)) {
				original = original.bind({}, ...args);
				return new original();
			}

			const result = original.apply(obj, args);

			if (time === self.TIME.AFTER) {
				callback.call(obj, args);
			}

			return result;
		}
	}
}

const spy = new Spy();

spy.after(document, "querySelector", args => {
	console.log(args);
});

spy.before(document, "getElementById", args => {
	console.log(args);
});

console.log(new XMLHttpRequest());
console.log(document.querySelector("div"));
console.log(document.getElementById("box", 1, true, "test"));