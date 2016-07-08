
/**
 * Monster
 */
var monsterData = {
    elements: [],
    timers: [],
    running: false
};
var monster = function() {

    if (!monsterData.running) {

        monsterData = {
            elements: [],
            timers: [],
            running: true
        };

        var redFace = function(el) {
            el.animate({
                fill: '#F24837'
            }, 400, mina.easeinout, function() {
                monsterData.timers.push(setTimeout(function() {
                    el.animate({
                        fill: '#F4823D'
                    }, 400, mina.easeinout);
                }, 1800));
            });
        }

        var breath = function() {
            monsterData.timers.push(setTimeout(function(e) {
                breath1.animate({
                    opacity: 0
                }, 400, mina.easeinout, function() {
                    monsterData.timers.push(setTimeout(function() {redFace(face); }, 50));
                    monsterData.timers.push(setTimeout(function() {redFace(armLeft); }, 100));
                    redFace(armRight);

                    monsterData.timers.push(setTimeout(function() {monsterLift(monster); }, 50));
                    monsterLift(monsterLeg, function() {
                        breath2.animate({
                            opacity: 0
                        }, 400, mina.easeinout);
                        breath3.animate({
                            opacity: 0
                        }, 400, mina.easeinout, function() {
                            breath1.animate({
                                opacity: 1
                            }, 400, mina.easeinout, function() {
                                monsterData.timers.push(setTimeout(breath, 2000));
                            });
                        });
                    });
                    breath2.animate({
                        opacity: 1
                    }, 400, mina.easeinout);
                    breath3.animate({
                        opacity: 1
                    }, 400, mina.easeinout);
                });
            }, 800));
        }

        function monsterLift(el, callback) {
            el.animate({
                transform: 't0,-10'
            }, 1300, mina.easeinout, function() {
                el.animate({
                    transform: 't0,0'
                }, 1300, mina.easeinout, function() {
                    if (callback) {
                        callback();
                    }
                });
            });
        }

        var face = Snap.select('#face'),
            armLeft = Snap.select('#arm-left'),
            armRight = Snap.select('#arm-right'),
            monster = Snap.select('#monster'),
            monsterLeg = Snap.select('#monster-leg'),
            breath1 = Snap.select('#breath-1'),
            breath2 = Snap.select('#breath-2'),
            breath3 = Snap.select('#breath-3');

        breath();

        monsterData.elements.push(face);
        monsterData.elements.push(armLeft);
        monsterData.elements.push(armRight);
        monsterData.elements.push(monster);
        monsterData.elements.push(monsterLeg);
        monsterData.elements.push(breath1);
        monsterData.elements.push(breath2);
        monsterData.elements.push(breath3);
    }
}

var stopMonster = function() {
    stopAnimations(monsterData);
    monsterData.running = false;
}

var resetMonster = function() {
    resetTransforms(monsterData);
    Snap.select('#breath-1').attr({
        opacity: 1
    });
    Snap.select('#breath-2').attr({
        opacity: 0
    });
    Snap.select('#breath-3').attr({
        opacity: 0
    });
    Snap.select('#face').attr({
        fill: '#F4823D'
    });
    Snap.select('#arm-left').attr({
        fill: '#F4823D'
    });
    Snap.select('#arm-right').attr({
        fill: '#F4823D'
    });
}

monster()