
import {
    dot,
    escapeHTML,
    fail,
    info,
    link,
    log,
    nav,
    pathList,
    print,
    render,
    resultMsg,
    summary,
} from '../output.js';

export default ({ assert, describe, it }) => {
    describe('#dot', () => {
        describe('given a falsy `isOk` property', () => {
            it('should return a `<span>` with the `dot` and `dot-fail` class', () => {
                assert(dot({ isOk: false })).equals('<span class="dot dot-fail"></span>');
            });
        });

        describe('given a truthy `isOk` property', () => {
            it('should return a `<span>` with the `dot` and `dot-ok` class', () => {
                assert(dot({ isOk: true })).equals('<span class="dot dot-ok"></span>');
            });
        });
    });

    describe('#escapeHTML', () => {
        describe('given an HTML string', () => {
            it('should return a string with escaped HTML', () => {
                const html   = '<h1 class="logo">Sal\'s Soups &amp; Sandwiches</h1>';
                const expect = '&lt;h1 class=&quot;logo&quot;&gt;Sal&#x27;s Soups &amp;amp; Sandwiches&lt;&#x2F;h1&gt;';
                assert(escapeHTML(html)).equals(expect);
            });
        });
    });

    describe('#fail', () => {
        describe('given a string', () => {
            it('should return the string wrapped in an `<li>` with the fail CSS class', () => {
                assert(fail('failure')).equals('<li class="fail">failure</li>');
            });
        });
    });

    describe('#info', () => {
        describe('given a string', () => {
            it('should return the string wrapped in an `<li>`', () => {
                assert(info('info')).equals('<li>info</li>');
            });
        });
    });

    describe('#link', () => {
        describe('given `label` and `href`', () => {
            it('should return an html link', () => {
                assert(link('Mystic Waffle', 'https://www.mysticwaffle.com/'))
                    .equals('<a href="https://www.mysticwaffle.com/">Mystic Waffle</a>');
            });
        });

        describe('given at truthy `active` option', () => {
            it('should return an html link with a `data-active` attribute', () => {
                assert(link('Mystic Waffle', 'https://www.mysticwaffle.com/', { active: true }))
                    .stringContains(' data-active');
            });
        });
    });

    describe('#log', () => {
        describe('given no results', () => {
            it('should return an empty string', () => {
                assert(log([])).equals('');
            });
        });

        describe('given one success then one failure', () => {
            const results = [
                { isOk: true, msg: 'success' },
                { isOk: false, msg: 'failure' },
            ];

            it('should return only the failure', () => {
                assert(log(results)).equals(fail('failure'));
            });

            describe('given the verbose flag', () => {
                it('should return the success and the failure', () => {
                    const expect = info('success') + fail('failure');
                    assert(log(results, { verbose: true })).equals(expect);
                });
            });
        });

        describe('given two successes then two failures', () => {
            const results = [
                { isOk: true, msg: 'yep' },
                { isOk: true, msg: 'you bet' },
                { isOk: false, msg: 'nope' },
                { isOk: false, msg: 'no way' },
            ];

            it('should return only the two failures', () => {
                assert(log(results)).equals(fail('nope') + fail('no way'));
            });

            describe('given the verbose flag', () => {
                it('should return the two success then the two failures', () => {
                    const expect = info('yep') + info('you bet') + fail('nope') + fail('no way');
                    assert(log(results, { verbose: true })).equals(expect);
                });
            });
        });
    });

    describe('#nav', () => {
        describe('given no options', () => {
            const html = nav({});

            it('should contain the urls', () => {
                [
                    './unit.html',
                    './unit.html?action=list',
                    './unit.html?verbose=true',
                ].forEach((url) => {
                    assert(html).stringContains(url);
                });
            });
        });

        describe('given an `action` string option', () => {
            const html = nav({ action: 'fake' });

            it('should contain the urls', () => {
                [
                    './unit.html',
                    './unit.html?action=list',
                    './unit.html?action=fake&verbose=true',
                ].forEach((url) => {
                    assert(html).stringContains(url);
                });
            });
        });

        describe('given a truthy `verbose` option', () => {
            const html = nav({ verbose: true });

            it('should contain the urls', () => {
                [
                    './unit.html?verbose=true',
                    './unit.html?action=list&verbose=true',
                    './unit.html',
                ].forEach((url) => {
                    assert(html).stringContains(url);
                });
            });
        });

        describe('given an `action` string and truthy `verbose` options', () => {
            const html = nav({ action: 'fake', verbose: true });

            it('should contain the urls', () => {
                [
                    './unit.html?verbose=true',
                    './unit.html?action=list&verbose=true',
                    './unit.html?action=fake',
                ].forEach((url) => {
                    assert(html).stringContains(url);
                });
            });
        });
    });

    describe('#pathList', () => {
        describe('given an array of paths', () => {
            const paths = [ './path/one', './path/two' ];
            const html  = pathList(paths);

            it('should return an html list with an `<li>` and `</li>` for each path', () => {
                assert((html.match(/<li>/g) || []).length).equals(paths.length);
                assert((html.match(/<\/li>/g) || []).length).equals(paths.length);
            });

            it('should return an html link with `?action=path` as the link\'s `href`', () => {
                paths.forEach((path) => {
                    assert(html).stringContains(`<a href="?action=${path}">`);
                });

                assert((html.match(/<\/a>/g) || []).length).equals(paths.length);
            });
        });
    });

    describe('#print', () => {
        describe('given an element and an html string', () => {
            it('should set the html string to the element', () => {
                const el = document.createElement('p');
                print(el, '<b>wombats</b>');
                assert(el.innerHTML).equals('<b>wombats</b>');
            });
        });

        describe('called multiple times', () => {
            it('should append html strings to the element', () => {
                const el = document.createElement('ul');
                print(el, '<li>gems</li>');
                print(el, '<li>potions</li>');
                assert(el.innerHTML).equals('<li>gems</li><li>potions</li>');
            });
        });
    });

    describe('#render', () => {
        describe('given an element and an html string', () => {
            it('should set the html string to the element', () => {
                const el = document.createElement('h1');
                render(el, '<strong>buff</strong>');
                assert(el.innerHTML).equals('<strong>buff</strong>');
            });
        });

        describe('called multiple times', () => {
            it('should replace the element\'s content with the last html string', () => {
                const el = document.createElement('section');
                render(el, '<p>first wizard</p>');
                render(el, '<p>second wizard</p>');
                assert(el.innerHTML).equals('<p>second wizard</p>');
            });
        });
    });

    describe('#resultMsg', () => {
        describe('given an empty array', () => {
            it('should return an empty string', () => {
                assert(resultMsg([])).equals('');
            });
        });

        describe('given a single entry', () => {
            it('should return the entry', () => {
                assert(resultMsg([ 'just us chickens' ])).equals('just us chickens');
            });
        });

        describe('given three entries', () => {
            const entries = resultMsg([ 'jimmy', 'joey', 'sarah' ]);
            const lines = entries.split(`\n`);

            it('should return each entry on a new line', () => {
                assert(lines[0].trim()).equals('jimmy');
                assert(lines[1].trim()).equals('joey');
                assert(lines[2].trim()).equals('sarah');
            });

            it('should indent each line with two spaces', () => {
                assert(lines[0]).stringContains('');
                assert(lines[1]).stringContains('  ');
                assert(lines[2]).stringContains('    ');
            });
        });
    });

    describe('#summary', () => {
        describe('assertions', () => {
            describe('given `0` assertions', () => {
                it('should return a string containing `0 Assertions`', () => {
                    assert(summary(0, 0)).stringContains('0 Assertions');
                });
            });

            describe('given `1` assertion', () => {
                it('should return a string containing `1 Assertion`', () => {
                    assert(summary(1, 0)).stringContains('1 Assertion');
                });
            });

            describe('given `2` assertions', () => {
                it('should return a string containing `2 Assertions`', () => {
                    assert(summary(2, 0)).stringContains('2 Assertion');
                });
            });
        });

        describe('failures', () => {
            describe('given `0` failures', () => {
                it('should return a string containing `0 Failures`', () => {
                    assert(summary(1, 0)).stringContains('0 Failures');
                });

                it('should return a `<span>` with the `ok` css class', () => {
                    assert(summary(1, 0))
                        .stringContains('<span class="ok">')
                        .stringContains('</span>');
                });
            });

            describe('given failures', () => {
                it('should return a `<span>` with the `fail` css class', () => {
                    assert(summary(1, 1))
                        .stringContains('<span class="fail">')
                        .stringContains('</span>');
                });

                describe('given `1` failure', () => {
                    it('should return a string containing `1 Failure`', () => {
                        assert(summary(1, 1)).stringContains('1 Failure');
                    });
                });

                describe('given `2` failures', () => {
                    it('should return a string containing `2 Failures`', () => {
                        assert(summary(1, 2)).stringContains('2 Failures');
                    });
                });
            });
        });
    });
};