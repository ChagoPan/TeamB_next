"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AB_LIST, AVATAR_PATH, AB_DELETE } from "@/config/api-path";
import { useRouter, useSearchParams } from "next/navigation";
import { FaRegTrashCan, FaRegPenToSquare } from "react-icons/fa6";

export default function ABListPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRef = useRef();

  const [refresh, setRefresh] = useState(false);
  const [listData, setListData] = useState({
    success: false,
    perPage: 0,
    totalRows: 0,
    totalPages: 0,
    page: 0,
    rows: [],
    keyword: "",
  });

  const deleteItem = async (ab_id) => {
    const r = await fetch(`${AB_DELETE}/${ab_id}`, {
      method: "DELETE",
    });
    const result = await r.json();
    console.log(result);
    if (result.success) {
      setRefresh((o) => !o);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${AB_LIST}${location.search}`, {
      signal,
    })
      .then((r) => r.json())
      .then((obj) => {
        console.log(obj);
        if (obj.success) {
          setListData(obj);
        }
      })
      .catch(console.warn);
    return () => {
      // 取消或清除
      // effect clean-up
      controller.abort(); // 取消 ajax 的回應
    };
  }, [searchParams, refresh]);

  console.log(listData);
  return (
    <>
      <div className="row">
        <div className="col-6">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {Array(11)
                .fill(1)
                .map((v, i) => {
                  const p = listData.page - 5 + i;
                  if (p < 1 || p > listData.totalPages) return null;
                  const usp = new URLSearchParams(searchParams.toString());
                  usp.set("page", p);
                  return (
                    <li
                      className={
                        p == listData.page ? "page-item active" : "page-item"
                      }
                      key={p}
                    >
                      <Link className="page-link" href={`?${usp}`}>
                        {p}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </nav>
        </div>
        <div className="col-6">
          <form
            className="d-flex"
            role="search"
            onSubmit={(e) => {
              e.preventDefault(); // 不要以傳統的方式送出表單
              router.push(`?keyword=${searchRef.current.value}`);
            }}
          >
            <input
              ref={searchRef}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>
                  <FaRegTrashCan />
                </th>
                <th>#</th>
                <th>姓名</th>
                <th>頭貼</th>
                <th>電郵</th>
                <th>手機</th>
                <th>生日</th>
                <th>地址</th>
                <th>
                  <FaRegPenToSquare />
                </th>
              </tr>
            </thead>
            <tbody>
              {listData.rows.map((r, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteItem(r.ab_id);
                        }}
                      >
                        <FaRegTrashCan />
                      </a>
                    </td>
                    <td>{r.ab_id}</td>
                    <td>{r.name}</td>
                    <td>
                      {r.avatar ? (
                        <img
                          src={`${AVATAR_PATH}/${r.avatar}`}
                          alt=""
                          height="100"
                        />
                      ) : null}
                    </td>
                    <td>{r.email}</td>
                    <td>{r.mobile}</td>
                    <td>{r.birthday}</td>
                    <td>{r.address}</td>
                    <td>
                      <a href="#">
                        <FaRegPenToSquare />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
