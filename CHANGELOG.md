# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased]

## [1.1.2] - 2018-01-23

### Fixed

- Critical security vulnerability in Electron

## [1.1.1] - 2018-01-20

### Fixed

- Device icon for the following models:
    - AXIS A8004-VE
    - AXIS A9188-VE
    - AXIS M1045-LW
    - AXIS M1054
    - AXIS M3024-LVE
    - AXIS M3046-V
    - AXIS M3106-L Mk II
    - AXIS M3114-VE
    - AXIS M3204
    - AXIS M7014
    - AXIS P1365 Mk II
    - AXIS P1405-LE Mk II
    - AXIS P3224-V Mk II
    - AXIS P3225-V Mk II
    - AXIS P3363-V
    - AXIS P3365-V
    - AXIS P5624-E Mk II
    - AXIS Q6000-E Mk II
    - AXIS Q6045-E Mk II
    - AXIS Q8414-LVS
    - AXIS T8705

## [1.1.0] - 2018-01-10

### Added
- Support for macOS

### Removed
- Bonjour discovery protocol. Supporting Bonjour on macOS is harder than on other platforms. Preliminary tests show that the same number of devices are found using only SSDP, thus the net loss seems negligible.

### Fixed
- [#201](https://github.com/FantasticFiasco/searchlight/issues/201) No device icon displayed

## [1.0.0] - 2017-12-03

### Added
- Cross compatible on Linux and Windows
- Bonjour and SSDP (UPnP) discovery protocols
- Monitoring of device network connectivity
- Automatic updates
- Links to device live view page and product page on [www.axis.com](https://www.axis.com)
