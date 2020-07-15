class KeyValuePair<T, U> {
  private key: T;
  private val: U;
  private obj: { [key in string | number]: U } = {};

  setKeyValue(key: T, val: U) {
    this.key = key;
    this.val = val;
    this.obj['a'] = val;
  }

  display(): void {
    console.log(`key = ${this.key}, value = ${this.val}`);
    console.log(JSON.stringify(this.obj));
  }
}

let kvp = new KeyValuePair<number, string>();
kvp.setKeyValue(1, 'Steve');
kvp.display();
