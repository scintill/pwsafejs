$(function() {
    $('#passForm').submit(function(e) {
        e.preventDefault();

        var passphrase = $('#passphrase').val();
        var filename = $('#filename').val();
        $.ajax(
            {
                url: filename,
                dataType: 'binary',
                success: function (data) {
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
                error: function() {
                    $('#errorMessage').text('File not found.');
                }
            }
        );
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
