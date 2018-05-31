// module.exports.a = 7;
module.exports.b = 23;


const myFirstPromise = new Promise((resolve, reject) => {
	// do something asynchronous which eventually calls either:
	let sum = '10';
	for (let i = 0; i >= 10; i += 1) {
		sum += i;
	}


	if (typeof sum === 'number') {
		resolve('success! sum is ' + sum);
	} else {
		reject('catch - sum is: ' + sum);
	}
	//
	//   resolve(someValue); // fulfilled
	// or
	//   reject("failure reason"); // rejected
});

myFirstPromise.then((message) => {
	console.log(message);

}).catch((message) => {
	console.log(message);
});