export function response(res) {
    let msg = res.data.msg
    let status = res.data.key
    let data = res.data.data
    if (status === 'success') {
        return {
            status: 'success',
            data: data,
            msg: msg
        }
    } else if (res.data.key === 'fail') {
        return {
            status: 'fail',
            msg: msg
        }
    }
    else if (res.data.key === 'unauthenticated') {
        return {
            status: 'unauthenticated',
            msg: msg
        }
    } else {
        return false;
    }
}

