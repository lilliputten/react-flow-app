export function toggleClassName(node: Element, cls: string, isOn?: boolean) {
  if (isOn && !node.classList.contains(cls)) {
    node.classList.add(cls);
  } else if (!isOn && node.classList.contains(cls)) {
    node.classList.remove(cls);
  }
}

export function removeAllChildren(node: Element) {
  if (node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  }
}

export function querySelector(query: string, node?: ParentNode) {
  if (!node) {
    node = document;
  }
  return node.querySelector(query);
}

export function getQuerySelector(node: ParentNode) {
  if (!node) {
    node = document;
  }
  return node.querySelector.bind(node);
}

/** @return promise */
export function addScript(url: string) {
  return new Promise((resolve, reject) => {
    // document.write('<script src="' + url + '"></script>');
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.addEventListener('load', resolve);
    script.addEventListener('error', reject);
    document.head.appendChild(script);
  });
}
