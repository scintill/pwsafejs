$(function() {
    $('#passphrase').focus();
    $('#passForm').submit(function(e) {
        e.preventDefault();

        $('#errorMessage').text('');

        var passphrase = $('#passphrase').val();
        var filename = $('#filename').val();

        PWSafeDB.jsPath = 'pwsafedb.js';
        PWSafeDB.downloadAndDecrypt(filename, passphrase, function(pdb) {
            if (typeof pdb == "string") {
                $('#errorMessage').text(pdb);
                return; // <----
            }

            $('#passFormWrapper').hide();
            pdb.sortRecordsByTitle();
            for (var i = 0; i < pdb.records.length; i++) {
                addEntry(pdb.records[i]);
            }
        });
    });
});

function addEntry(record) {
    $entry = $('<div class="entry" />');
    $entry.click(function() {
        $(this).toggleClass('expanded');
    });


    var $link = $('<a class="title" />');
    $link.text(record.title).attr('href', record.URL);
    $link.appendTo($entry);

    var $user = $('<span class="username entrySubField" />')
    $user.text(record.username).appendTo($entry);

    var $password = $('<span class="password entrySubField" />')
    $password.text(record.password).appendTo($entry);

    if (record.notes) {
        var $notes = $('<span class="notes entrySubField" />')
        $notes.html('<pre>'+record.notes+'</pre>').appendTo($entry);
    }

    $entry.appendTo(document.body);
}
