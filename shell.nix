{ pkgs ? import <nixpkgs> {} }:

with pkgs;

mkShell {
  buildInputs = [ ruby ];
  shellHook = ''
    export PATH=./.gem/bin:"$PATH"
    export GEM_HOME=./.gem
    export SASS_PATH=.:./stylesheets

    if ! command -v discourse_theme >/dev/null; then
      echo "Installing discourse_theme CLI"
      gem install discourse_theme
    fi
  '';
}
