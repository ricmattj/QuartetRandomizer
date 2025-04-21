$(document).ready(function(){
    $.get('/counts', function(countObj) {
        var output = '<tr>' +
                        '<td><button class="btn btn-primary partDetail" data="basses"><span class="glyphicon glyphicon-user"/>&nbsp;' + countObj.basses + '</button> <button class="btn btn-default randomPart" data="basses"><span class="glyphicon glyphicon-refresh"/>&nbsp;Random</button></td>' +
                        '<td><button class="btn btn-primary partDetail" data="leads"><span class="glyphicon glyphicon-user"/>&nbsp;' + countObj.leads + '</button> <button class="btn btn-default randomPart" data="leads"><span class="glyphicon glyphicon-refresh"/>&nbsp;Random</button></td>' +
                        '<td><button class="btn btn-primary partDetail" data="baris"><span class="glyphicon glyphicon-user"/>&nbsp;' + countObj.baris + '</button> <button class="btn btn-default randomPart" data="baris"><span class="glyphicon glyphicon-refresh"/>&nbsp;Random</button></td>' +
                        '<td><button class="btn btn-primary partDetail" data="tenors"><span class="glyphicon glyphicon-user"/>&nbsp;' + countObj.tenors + '</button> <button class="btn btn-default randomPart" data="tenors"><span class="glyphicon glyphicon-refresh"/>&nbsp;Random</button></td>' +
                        '</tr>';
        $('#countBody').append(output);

        $('.partDetail').click(function() {
            var obj = $(this);

            $('.modal-title').html('Members: ' + obj.attr('data'));

            $.get('/' + obj.attr('data'), function(list) {
                $('#partListBody').html('');
                list.forEach(function(member) {
                    $('#partListBody').append('<li>' + member + '</li>');
                });
                $('#partList').modal();
            });
        });

        $('.randomPart').click(function() {
            var obj = $(this);

            $('.modal-title').html('Random ' + obj.attr('data'));

            $.get('/' + obj.attr('data') + 'Random', function(member) {
                $('#partListBody').html('<li>' + member + '</li>');
                $('#partList').modal();
            });
        });
    });

    $('#randomize').click(function() {
        $('#print').prop('disabled', false);
        $("#resultBody").html('');
        $.get('/getRandomQuartets', function(quartets) {
            let number = 1;
            quartets.forEach(function(quartet){
                $('#resultBody').append('<tr class="quartet-row">' +
                                            '<td>' + number++ + '</td>' +
                                            '<td>' + quartet. bass + '</td>' +
                                            '<td>' + quartet.lead + '</td>' +
                                            '<td>' + quartet.bari + '</td>' +
                                            '<td>' + quartet.tenor + '</td>' +
                                            '<td class="song">' + quartet.song + '</td>' +
                                            '<td class="quartet-name"><input type="text" class="quartet-name--input"/></td>' +
                                        '</tr>');
            });
        });
    });

    $("#randomizeSingle").click(function() {
        $('#print').prop('disabled', false);
        $("#resultBody").html('');
        $.get('/getSingleRandomQuartet', function(quartet) {
            $('#resultBody').append('<tr class="quartet-row">' +
                                        '<td>1</td>' +
                                        '<td>' + quartet. bass + '</td>' +
                                        '<td>' + quartet.lead + '</td>' +
                                        '<td>' + quartet.bari + '</td>' +
                                        '<td>' + quartet.tenor + '</td>' +
                                        '<td class="song">' + quartet.song + '</td>' +
                                        '<td class="quartet-name"><input type="text" class="quartet-name--input"/></td>' +
                                    '</tr>');
        });
    });

    $('#randomSong').click(function() {
        $('.modal-title').html('Random Song');

        $.get('/songsRandom', function(song) {
            $('#partListBody').html('<li>' + song + '</li>');
            $('#partList').modal();
        });
    });

    $('#hideSong').click(function() {
        if($(this).is(':checked')) {
            $('.song').hide();
        } else {
            $('.song').toggle();
        }
    });
});
