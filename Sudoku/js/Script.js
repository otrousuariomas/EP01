window.onload = function()
{
        sudoku      = [],
        solve       = [],
        dimension   = 3,
        dificultad  = 1;


    //Para cargar los combos...
    var select = nom_div("opc_2");
    for (var i = 2; i<= 5; i++)
    {
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        select.appendChild(opt);
    }

    /*
        Función en la cual llega el valor escrito por el usaurio
        además de la posición del valor digitado en la matriz...
        Se deberá validar si el número digitado cumple con la condición para estar en esa posición...
        1. Un número no puede repetirse en el mismo cuadrante...
        2. Un número no puede estar en la misma Fila.
        3. Un número no puede estar en la misma columna.
    */

    nom_div("Comparar").addEventListener('click', function(event)
      {
        var comparaSudokuSolve = (function (){

          for (var i=0; i<sudoku.length; i++)
          {
            for (var j=0; j<solve.length;j++)
            {
              if(sudoku === solve){
                for (var k=0; k<sudoku.length;k++){
                  if(k === sudoku){
                    alert("sudoku resuelto");
                  }
                }
              }else {
                alert("sudoku erroneo");
                  }
                }
              }
            })();
          });

    var nuevoSudoku = (function nuevoSudoku()
    {
        var newSudoku = sudokuJS.creaSudoku(dimension, dificultad);
        sudoku = newSudoku.sudokujs;
        solve = newSudoku.respuesta;
        //Para dibujar el sudoku en html...
        var txt     = "<table>",
            nomID   = "";
            eventos = [];
        for(var fila = 0; fila < sudoku.length; fila++)
        {
            txt += "<tr>";
            for(col = 0; col < sudoku.length; col++)
            {
                txt += "<td>";
                txt += "<table class = 'cuadrante' id = '"+fila+"_"+col+"'>"
                for(x = 0; x < sudoku.length; x++)
                {
                    txt += "<tr>";
                    for(y = 0; y < sudoku.length; y++)
                    {
                        nomID = fila + "_" + col + "_" + x + "_" + y;
                        txt += "<td class = 'interno' id = 'td_"+(nomID)+"'>"
                        if(sudoku[fila][col][x][y] !== 0)
                        {
                            txt += sudoku[fila][col][x][y];
                        }
                        else
                        {
                            txt += "<input type = 'text' class = 'numero' id = '"+(nomID)+"' maxlength = '1'>";
                            eventos.push(nomID);
                        }
                        txt += "</td>";
                    }
                    txt += "</tr>";
                }
                txt += "</table>";
            }
            txt += "</tr>";
        }
        txt += "</table>";
        nom_div("escenario").innerHTML = txt;
        for(var i = 0; i < eventos.length; i++)
        {
            nom_div(eventos[i]).addEventListener("keyup", function(event)
            {
                if(isNumber(this.value) || this.value === "")
                {
                    validaSudoku(this.value === "" ? 0 : Number(this.value), this.id);
                }
                else
                {
                    this.value = "";
                }
            });
        }
        //Fin de dibujar el sudoku...
        return nuevoSudoku;
    })();

    nom_div("resuelve").addEventListener('click', function(event)
	{
		//console.log(event);
        //Para completar los campos del sudoku...
        //resuelve
        var nomID = "";
        for(var fila = 0; fila < solve.length; fila++)
        {
            for(var col = 0; col < solve.length; col++)
            {
                for(var i = 0; i < solve.length; i++)
                {
                    for(var c = 0; c < solve.length; c++)
                    {
                        //Saber si el input existe para completar el espacio...
                        nomID = fila + "_" + col + "_" + i + "_" + c;
                        if(nom_div(nomID) !== null)
                        {
                            nom_div(nomID).value = solve[fila][col][i][c];
                        }
                    }
                }
            }
        }
	});

    nom_div("nuevo").addEventListener('click', function(event)
    {
        nuevoSudoku();
    });

    for(var combo = 1; combo <= 2; combo++)
    {
        nom_div("opc_" + combo).addEventListener('change', function(event)
        {
            var numOpc = Number(this.id.split("_")[1]);
            if(numOpc === 1)
            {
                if(Number(this.value) !== 0)
                {
                    dificultad = Number(this.value);
                }
            }
            else
            {
                if(Number(this.value) !== 0)
                {
                    dimension = Number(this.value);
                }
            }
            nuevoSudoku();
        });
    }

    function isNumber(n)
    {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function nom_div(div)
	{
		return document.getElementById(div);
	}
};
