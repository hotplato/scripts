export const getPlatform = os.platform()

export const existCommond = async (commond) => {
    let prefix = 'whereis'
    if (os.platform() === 'win32') {
        prefix = 'where'
    }
    const p = await $`${prefix} ${commond}`
    return Boolean(p.stdout)
}