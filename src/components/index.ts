export default ((modulesFiles: any) => {
  const allComponents: any = {};

  modulesFiles.keys().map((path: string) => {
    const name = (path.match(/\/([a-zA-Z]+)\.tsx$/) as any)[1];
    allComponents[name] = modulesFiles(path).default;
    return false;
  });

  return allComponents;
})((require as any).context("../components", true, /.tsx$/));
