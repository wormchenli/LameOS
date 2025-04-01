import { osConfig } from "@/os/os.config";
function loadComponentConfig() {
    const components = osConfig.ComponentMapper;
    const componentMap: {
        [key: string]: () => Promise<{ default: React.ComponentType }>;
    } = {};
    components.forEach((component) => {
        componentMap[component.name] = () =>
            import(`@/views/components/${component.name}`);
    });
    return componentMap;
}

export async function loadComponent(
    name: string
): Promise<React.ComponentType> {
    const componentMap = loadComponentConfig();
    const componentLoader = componentMap[name];
    if (componentLoader) {
        const component = await componentLoader();
        return component.default;
    } else {
        throw new Error(`Component ${name} not found`);
    }
}
