$.get('config.json', function(config) {
    $(function() {
        $('#passphrase').focus();
        $('#filename').empty();
        $.each(config.databaseFilenames, function(i, dbName) {
            var $option = $('<option/>');
            $option.val(dbName);
            $option.text(dbName);
            $('#filename').append($option);
        });

        $('#passForm').submit(function(e) {
            e.preventDefault();

            $('#errorMessage').text('');
            $('#spinner').show();

            var passphrase = $('#passphrase').val();
            var filename = $('#filename').val();

            PWSafeDB.downloadAndDecrypt(filename, passphrase, function(pdb) {
                $('#spinner').hide();
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

        function addEntry(record) {
            var $entry = $('<div class="entry" />');
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
    });
}, 'json')
.error(function() {
    $('#errorMessage').text('Error downloading config file.');
});
