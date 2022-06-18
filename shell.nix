let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs { };
in pkgs.mkShell rec {
  buildInputs = with pkgs; [
    nodejs
    yarn
    yarn2nix
  ];
  LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath buildInputs;
  LANG = "C.UTF-8";
}
