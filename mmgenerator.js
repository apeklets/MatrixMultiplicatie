var Matrix = {};

function num() {
    //Generate a number in [-9, 9], with 11% chance for 1, 10% chance for 0, 9% chance for -1
    var randVal1 = Math.random();
    var randVal2 = Math.random();
    if(randVal1 <= 0.11) {
        return 1;
    } else if(randVal1 <= 0.21) {
        return 0;
    } else if(randVal1 <= 0.30) {
        return -1;
    } else if(randVal1 <= 0.64) {
        return Math.floor(-8 * randVal2) - 1;
    } else {
        return Math.floor(8 * randVal2) + 1;
    }
}

function numbers(n) {
    //Generate an array of length n with 'random' numbers generated by num().
    var arr = [];
    for(var i = 0; i < n; i++) {
        arr.push(num());
    }
    return arr;
}

var Matrices = {
    generate: function(n, m) { //Generate random n by m matrix
        var matrix = [];
        for(var i = 0; i < n; i++) {
            matrix.push(numbers(m));
        }
        return matrix;
    },
    multiply: function(A, B) { //Multiply matrices A and B.
        //Find the dimensions.
        var m = Matrices.A.length;
        var n = Matrices.B.length;
        var p = Matrices.B[0].length;
        //New matrix will be n by p, initialize such a matrix
        var M = Matrices.generate(m, p);
        //Fill the matrix with the correct values
        for(var i = 0; i < m; i++) {
            for(var j = 0; j < p; j++) {
                var e = 0;
                for(var k = 0; k < n; k++) {
                    e += Matrices.A[i][k] * Matrices.B[k][j];
                }
                M[i][j] = e;
            }
        }
        return M;
    },
    print_tex: function(M) {
        var tex = "\\begin{bmatrix}";
        var end = "\\end{bmatrix}";
        for(var i = 0; i < M.length; i++) {
            for(var j = 0; j < M[i].length-1; j++) {
                tex += M[i][j].toString() + " & ";
            }
            tex += M[i][M[i].length-1].toString();
            tex += "\\\\\n";
        }
        return tex + end;
    }
};

$(document).ready(function() {
    $('.solve').hide();
    $('.generate').click(function() {
        $(this).hide();
        setTimeout(function() {$('.solve').fadeIn()}, 300);
        var m = Math.floor(4 * Math.random()) + 2;
        var n = Math.floor(5 * Math.random()) + 1;
        var p = Math.floor(5 * Math.random()) + 1;
        Matrices.A = Matrices.generate(m, n);
        Matrices.B = Matrices.generate(n, p);
        $('#problem-container').text("$$M=" + Matrices.print_tex(Matrices.A) + "\\times " + Matrices.print_tex(Matrices.B) + "$$");
        $("#solution-container").text("");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
    });
    $('.solve').click(function() {
        $(this).hide();
        setTimeout(function() {$('.generate').fadeIn()}, 300);
        Matrices.M = Matrices.multiply(Matrices.A, Matrices.B);
        $('#solution-container').text("$$=" + Matrices.print_tex(Matrices.M) + "$$");
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "solution-container"]);
    });
});