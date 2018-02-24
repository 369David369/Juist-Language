'use babel';

import { _ } from 'lodash';
import { TextEditor } from 'atom';
import { CompositeDisposable } from 'atom';
import { AtomAutocompleteProvider } from './AtomAutocompleteProvider';
import { JavaClassLoader } from './JavaClassLoader';
import atomJavaUtil from './atomJavaUtil';

class AtomAutocompletePackage {

  constructor() {
      this.subscriptions = undefined;
      this.provider = undefined;
      this.classLoader = undefined;
      this.classpath = null;
      this.initialized = false;
  }

  activate() {
    this.classLoader = new JavaClassLoader("JAVA_HOME");
    this.provider = new AtomAutocompleteProvider(this.classLoader);
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'juist:refresh-project',
      () => {
        if (this.initialized) {
          this._refresh(false);
        }
      })
    );
    this.subscriptions.add(
      atom.commands.add('atom-workspace', 'juist:full-refresh',
      () => {
        if (this.initialized) {
          this._refresh(true);
        }
      })
);

}
