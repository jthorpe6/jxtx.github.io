#!/bin/bash

function convert_all() {
    for ORGFILE in *.org
    do 
        emacs "$ORGFILE" --batch -q \
            -l ./htmlize.el \
            --eval '(setq user-full-name nil)' \
            --eval '(setq org-html-validation-link nil)' \
            --eval '(setq org-export-html-postamble nil)' \
            --eval "(setq org-export-htmlize-output-type 'css)" \
            -f org-html-export-to-html \
            --kill
    done
    rm ./*~
}

function convert_one() {
    emacs "$1" --batch -q \
        --eval '(setq user-full-name nil)' \
        --eval '(setq org-html-validation-link nil)' \
        --eval '(setq org-export-html-postamble nil)' \
        --eval "(setq org-export-htmlize-output-type 'css)" \
        -f org-html-export-to-html --kill
    rm ./*~
}

if [ ! -f "htmlize.el" ]
then
    wget https://raw.githubusercontent.com/hniksic/emacs-htmlize/master/htmlize.el
fi

if [ -z "$1" ]
then
    convert_all
else
    convert_one "$@"
fi
rm ./htmlize.el