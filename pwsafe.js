$(function() {
    $('#passForm').submit(function(e) {
        e.preventDefault();

        try {

            var passphrase = $('#passphrase').val();
            var filename = $('#filename').val();
            $.get(
                filename,
                function (data) {
                    var pdb = new PWSafeDB(data);
                    try {
                        pdb.decrypt(passphrase);
                    } catch (e) {
                        $('#errorMessage').text(e);
                        return;
                    }

                    $('#passFormWrapper').hide();
                    for (var i = 0; i < pdb.records.length; i++) {
                        addEntry(pdb.records[i]);
                    }
                },
                'binary'
            );
        } catch (e) {
            $('#errorMessage').text(e);
        }
    });
});

function addEntry(record) {
    $entry = $('<div class="entry" />');
    var $line = $('<span/>');
    var $link = $('<a class="title" />');
    $link.text(record.title).attr('href', record.URL);
    $link.appendTo($line);
    var $user = $('<span class="username" />')
    $user.text(record.username).appendTo($line);
    var $password = $('<span class="password" />')
    $password.text(record.password).appendTo($line);

    $line.appendTo($entry);
    $entry.appendTo(document.body);
}
