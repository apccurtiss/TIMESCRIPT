# TIMESCRIPT

Most languages concern themselves with the spatial positions of variables in memory. This is stupid. TIMESCRIPT is the only language to ever let the user access variables across both space AND time!

## Features:
TIMESCRIPT adds the new TIMETRAVEL OPERATOR: the `@` sign. With it, a variable can be accessed at any point in time!

```Javascript
var x = 1;
x = 2;
x = 3;
console.log(x); // Prints `3`
console.log(x@1); // Prints `2`
console.log(x@2); // Prints `1`
console.log(x@3); // Throws a TemporalError, as the variable does not exist
```

Observe: While most languages require O(n) space to store lists of integers, TIMESCRIPT is able to store the same list in O(1) using just a single variable!*

```Javascript
var list = 0;
for(var i = 0; i < 10; i=i+1) {
    list = i;
}
console.log(list@3);
```

*TIMESCRIPT's ability to store infiniate elements in a finite space is conditional upon the existence of time travel. Storage behaviors are undefined for TIMESCRIPT implementations that are not capable of time travel.

TIMESCRIPT syntax is identical to the subset of JavaScript syntax that I got around to implementing, plus the `@` operator. Every single aspect of the language is undefined behavior, but implementations are recommended to compile TIMESCRIPT files to identical JavaScript files, except that the `@` operator does something. Source files use the helpful file extension `.ts`, which obviously stands for TIMESCRIPT. The output file must always be named `a.out`, and this filename must never be changed, even by the user or other programs outside of the TIMESCRIPT compiler. Doing so is undefined behavior, although the spec (this README) recommends that doing so should trigger a complete wipe of the user's hard drive.

## Usage
Run `node timescript.js yourfile.ts`, then run `node a.out`.