# ng-omni-search

## Table of Contents

1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API](#api)
5. [Contributing](#contributing)
6. [License](#license)

## Introduction

ng-omni-search is an Angular library that provides a search component with voice recognition capabilities. It allows users to search for items using text input or voice commands.

## Installation

To install ng-omni-search, you need to add it as a dependency to your Angular project.

### npm
> npm install ng-omni-search

### Importing the module

Import the `NgOmniSearchModule` in your Angular module:

```typescript
import { NgOmniSearchModule } from 'ng-omni-search';

@NgModule({
  imports: [
    // ...
    NgOmniSearchModule
  ],
  // ...
})
export class YourModule { }
```

## Usage
To use the `ng-omni-search` component, add it to your template:
```typescript
<lib-ng-omni-search [language]="'en-US'"></lib-ng-omni-search>
```
The `language` input property sets the language for the voice recognition feature. The default value is the user's browser language.

## API
The ng-omni-search component exposes the following input properties and events:

### Input Properties
`language`: The language for the voice recognition feature.
### Output Events
search: Emitted when the user submits a search query. The event payload is the search query.
### Contributing
We welcome contributions to the ng-omni-search library. To contribute, please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and commit them.
Push your changes to your fork.
Create a pull request.
### License
ng-omni-search is licensed under the MIT License. See the LICENSE file for more information.