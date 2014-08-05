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

            PWSafeDB.decryptFromUrl(filename, passphrase, {}, function(pdb) {
                $('#spinner').hide();
                if (pdb instanceof Error) {
                    $('#errorMessage').text(pdb.message);
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

            var dontExpand = function(e) { e.stopPropagation(); };

            var $link = $('<a class="title" />');
            $link.text(record.title).attr('href', record.URL);
            $link.appendTo($entry);
            $link.click(dontExpand);

            var $user = $('<span class="username entrySubField copyable" />');
            $user.text(record.username);
            $user.appendTo($entry);
            $user.click(function(e) {
                // since the username goes out to the side on unexpanded hover,
                // might want to click it
                if ($(this).parent().hasClass('expanded')) {
                    dontExpand(e);
                }
            });

            var $password = $('<span class="password entrySubField copyable" />');
            $password.text(record.password);
            $password.appendTo($entry);
            $password.click(dontExpand);

            if (record.emailAddress) {
                var $emailAddress = $('<span class="emailAddress entrySubField copyable" />');
                $emailAddress.text(record.emailAddress).appendTo($entry);
                $emailAddress.click(dontExpand);
            }

            if (record.notes) {
                var $notes = $('<span class="notes entrySubField copyable" />');
                $notes.html('<pre>'+record.notes+'</pre>').appendTo($entry);
                $notes.click(dontExpand);
            }

            $entry.appendTo(document.body);

            $entry.find('.copyable').each(function() {
                var $copyable = $(this);
                var $clippyContainer = $('<span class="clippy"><span/></span>');
                $clippyContainer.prependTo($copyable);
                $clippyContainer.children().clippy({text: $copyable.text(), clippy_path: "clippy-jquery/bin/clippy.swf"});
            });
        }
    });
}, 'json')
.error(function() {
    $('#errorMessage').text('Error downloading config file.');
});
