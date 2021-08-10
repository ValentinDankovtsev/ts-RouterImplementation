type MatchType = string | RegExp | Function;

export function Router(): any {
  const listeners: any[] = [];
  let currentPath = location.pathname;
  let previousPath: string | null = null;

  const isMatch = (match: MatchType, path: string) =>
    (match instanceof RegExp && match.test(path)) ||
    (typeof match === "function" && match(path)) ||
    (typeof match === "string" && match === path);

  const handleListener = (
    match: MatchType,
    onBeforeEnter?: Function,
    onEnter?: Function,
    onLeave?: Function
  ) => {
    const args = { currentPath, previousPath, state: history.state };
    if (onBeforeEnter !== undefined)
      isMatch(match, previousPath as string) && onBeforeEnter(args);
    if (onEnter !== undefined) isMatch(match, currentPath) && onEnter(args);

    onLeave && isMatch(match, previousPath as string) && onLeave(args);
  };

  const handleAllListeners = () => listeners.forEach(handleListener as any);

  const on = (match: MatchType) => {
    const listener = { match };
    listeners.push(listener);
    handleListener(listener as MatchType);
  };

  const go = (url: string, state?: any) => {
    previousPath = currentPath;
    history.pushState(state, url, url);
    currentPath = location.pathname;
    handleAllListeners();
  };

  return { on, go, listeners };
}
