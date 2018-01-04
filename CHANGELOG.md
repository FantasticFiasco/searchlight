# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## Added
- Support for macOS

## Removed
- Bonjour discovery protocol. Supporting Bonjour on macOS is harder than on other platforms. Preliminary tests show that the same number of devices are found using only SSDP, thus the net loss seems negligible.

## Fixed
- [#201](https://github.com/FantasticFiasco/searchlight/issues/201) No device icon displayed

## [1.0.0] - 2017-12-03

### Added
- Cross compatible on Linux and Windows
- Bonjour and SSDP (UPnP) discovery protocols
- Monitoring of device network connectivity
- Automatic updates
- Links to device live view page and product page on [www.axis.com](https://www.axis.com)
