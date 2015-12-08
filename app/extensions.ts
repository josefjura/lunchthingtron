/// <reference path="typings/tsd.d.ts" />

String.prototype.splice = function(idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};